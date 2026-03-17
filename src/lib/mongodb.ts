import { MongoClient, Db } from 'mongodb';

interface MongoConnection {
  client: MongoClient;
  db: Db;
}

// Use a global variable to preserve the connection across hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    return Promise.reject(
      new Error('Please define the MONGODB_URI environment variable in .env.local')
    );
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(MONGODB_URI);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise!;
  }

  const client = new MongoClient(MONGODB_URI);
  return client.connect();
}

export async function connectToDatabase(): Promise<MongoConnection> {
  const client = await getClientPromise();
  const db = client.db();
  return { client, db };
}

export default getClientPromise;

/**
 * MongoDB Schema for Contact Submissions:
 *
 * Collection: contact_submissions
 * {
 *   _id: ObjectId,
 *   name: string,          // required, 2–100 chars
 *   email: string,         // required, valid email
 *   subject: string,       // required, 5–200 chars
 *   message: string,       // required, 10–2000 chars
 *   createdAt: Date,       // auto-set
 *   ip: string,            // requester IP for rate limiting
 *   read: boolean          // default false
 * }
 *
 * Recommended indexes:
 *   db.contact_submissions.createIndex({ createdAt: -1 })
 *   db.contact_submissions.createIndex({ ip: 1, createdAt: -1 })
 */


/**
 * MongoDB Schema for Contact Submissions:
 *
 * Collection: contact_submissions
 * {
 *   _id: ObjectId,
 *   name: string,          // required, 2–100 chars
 *   email: string,         // required, valid email
 *   subject: string,       // required, 5–200 chars
 *   message: string,       // required, 10–2000 chars
 *   createdAt: Date,       // auto-set
 *   ip: string,            // requester IP for rate limiting
 *   read: boolean          // default false
 * }
 *
 * Recommended indexes:
 *   db.contact_submissions.createIndex({ createdAt: -1 })
 *   db.contact_submissions.createIndex({ ip: 1, createdAt: -1 })
 */
