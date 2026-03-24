import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ContactModel from "@/lib/models/Contact";
import { sendEmail } from "@/lib/mailer";

// Basic in-memory rate limiting (Note: In production with multiple instances, use Redis or DB-based rate limiting)
const rateLimitCache = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    
    // Rate limiting check
    const currentTime = Date.now();
    const rateLimitData = rateLimitCache.get(ip) || { count: 0, resetTime: currentTime + RATE_LIMIT_WINDOW_MS };
    
    if (currentTime > rateLimitData.resetTime) {
      rateLimitData.count = 1;
      rateLimitData.resetTime = currentTime + RATE_LIMIT_WINDOW_MS;
    } else {
      rateLimitData.count++;
    }
    
    rateLimitCache.set(ip, rateLimitData);

    if (rateLimitData.count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, message, honeypot } = body;

    // Honeypot check (spam protection)
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Save to database
    const newContact = await ContactModel.create({
      name,
      email,
      message,
    });

    // Send email notification
    try {
      await sendEmail({
        to: process.env.SMTP_USER || "princekkushwaha@outlook.com",
        subject: `New Portfolio Contact Form Submission from ${name}`,
        text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // We still consider the request successful since it was saved to the DB
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
