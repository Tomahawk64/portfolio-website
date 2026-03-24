# Portfolio Website

A complete, production-ready portfolio website built with Next.js (TypeScript), Tailwind CSS, Framer Motion, and MongoDB Atlas.

## Prerequisites

- Node.js (v18+)
- MongoDB Atlas account/URI
- SMTP / Email provider credentials (e.g., SendGrid, Gmail app passwords)

## Local Development Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory by copying `.env.local.example` and fill in your credentials:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build & Local Start**
   To test the production build locally:
   ```bash
   npm run build
   npm run start
   ```

## Customizing Content

### 1. Resume Data (`src/data/resume.json`)
Update `src/data/resume.json` to change the personal details, education, experience, and skills displayed on the About, Experience, and Skills pages.

### 2. Projects Data (`src/data/projects.json`)
Edit `src/data/projects.json` to manage the projects shown on the Projects page. Add or remove array items as needed.

### 3. Images and Assets
- **Project Images**: Replace the placeholder image paths (e.g., `/images/projects/rg-consultancy.jpg`) in `projects.json` by adding your own images inside the `public/images/projects` directory.
- **Resume PDF**: Replace `public/resume.pdf` with your actual CV document so the download buttons work correctly.
- **Favicon**: Replace `public/favicon.ico` with your brand's icon.

### 4. Optional: Seed Script
To test the Database connection locally and add a dummy contact entry, you can run:
```bash
node scripts/seed-contact-sample.js
```
(Ensure `.env.local` variables are set correctly before running).
