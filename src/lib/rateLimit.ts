import { NextRequest } from 'next/server';
import { connectToDatabase } from './mongodb';

interface RateLimitRecord {
  ip: string;
  count: number;
  windowStart: Date;
}

const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX) || 5;
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000; // 15 minutes

export async function checkRateLimit(req: NextRequest): Promise<{ allowed: boolean; remaining: number }> {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  try {
    const { db } = await connectToDatabase();
    const col = db.collection<RateLimitRecord>('rate_limits');

    const windowStart = new Date(Date.now() - WINDOW_MS);

    const record = await col.findOne({ ip, windowStart: { $gte: windowStart } });

    if (!record) {
      await col.insertOne({ ip, count: 1, windowStart: new Date() });
      return { allowed: true, remaining: MAX_REQUESTS - 1 };
    }

    if (record.count >= MAX_REQUESTS) {
      return { allowed: false, remaining: 0 };
    }

    await col.updateOne({ _id: record._id }, { $inc: { count: 1 } });
    return { allowed: true, remaining: MAX_REQUESTS - record.count - 1 };
  } catch {
    // If rate limiting fails, allow the request through (fail open)
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }
}
