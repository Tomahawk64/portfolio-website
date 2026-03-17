import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import { sendContactEmail } from '@/lib/mailer';
import { checkRateLimit } from '@/lib/rateLimit';

const contactSchema = z.object({
  name: z.string().min(2, 'Name too short').max(100, 'Name too long').trim(),
  email: z.string().email('Invalid email').max(254),
  subject: z.string().min(5, 'Subject too short').max(200, 'Subject too long').trim(),
  message: z.string().min(10, 'Message too short').max(2000, 'Message too long').trim(),
  website: z.string().max(0), // honeypot — must be empty
});

export async function POST(req: NextRequest) {
  // Rate limiting
  const { allowed } = await checkRateLimit(req);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before sending another message.' },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Validate
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, subject, message, website } = parsed.data;

  // Honeypot — silently discard bot submissions
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Get IP for storage
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  // Save to MongoDB
  try {
    const { db } = await connectToDatabase();
    await db.collection('contact_submissions').insertOne({
      name,
      email,
      subject,
      message,
      ip,
      createdAt: new Date(),
      read: false,
    });
  } catch (err) {
    console.error('[contact API] MongoDB error:', err);
    return NextResponse.json(
      { error: 'Failed to save your message. Please try again later.' },
      { status: 500 }
    );
  }

  // Send emails (non-blocking for UX — log error but don't fail the request)
  try {
    await sendContactEmail({ name, email, subject, message });
  } catch (err) {
    console.error('[contact API] Email error:', err);
    // Email failure should not block the user's success response
  }

  return NextResponse.json({ ok: true, message: 'Message received. Thank you!' });
}
