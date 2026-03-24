import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is required in .env.local to run the seed script.");
  process.exit(1);
}

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactModel = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to database.");

    const dummyContact = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      message: "Hello Prince! I am really impressed by your portfolio. I'd love to chat about potential freelance opportunities.",
    };

    console.log("Creating dummy contact entry...");
    const created = await ContactModel.create(dummyContact);
    console.log(`✅ Dummy contact created successfully! ID: ${created._id}`);

  } catch (error) {
    console.error("❌ Failed to seed the dummy contact:", error);
  } finally {
    console.log("Closing connection...");
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
