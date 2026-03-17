/**
 * seed-contact-sample.js
 *
 * Adds a sample contact submission to MongoDB Atlas.
 *
 * Usage:
 *   MONGODB_URI=<your-uri> node scripts/seed-contact-sample.js
 *
 * Or with dotenv-cli:
 *   npx dotenv -e .env.local -- node scripts/seed-contact-sample.js
 */

const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI environment variable is not set.');
    console.error('Run: MONGODB_URI=<your-uri> node scripts/seed-contact-sample.js');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas.');

    const db = client.db();
    const col = db.collection('contact_submissions');

    const sample = {
      name: 'John Doe (Sample)',
      email: 'john.doe@example.com',
      subject: 'Sample inquiry from seed script',
      message: 'This is a sample contact submission created by the seed script. You can delete it from your MongoDB dashboard.',
      ip: '127.0.0.1',
      createdAt: new Date(),
      read: false,
    };

    const result = await col.insertOne(sample);
    console.log(`✅ Sample contact inserted with _id: ${result.insertedId}`);

    // Also ensure indexes exist
    await col.createIndex({ createdAt: -1 });
    await col.createIndex({ ip: 1, createdAt: -1 });
    console.log('✅ Indexes ensured on contact_submissions collection.');
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB.');
  }
}

main().catch((err) => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
