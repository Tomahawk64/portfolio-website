# Prince Kushwaha — Portfolio Website

A production-ready personal portfolio built with **Next.js 14 (TypeScript)**, **Tailwind CSS**, **Framer Motion**, and **MongoDB Atlas** for contact storage.

---

## Prerequisites

- **Node.js** `>= 18.17` ([download](https://nodejs.org/))
- **npm** `>= 9`
- A **MongoDB Atlas** account (free tier works) — or a local MongoDB instance
- An **SMTP** provider (Gmail App Password, Mailtrap, etc.)

---

## Local Development Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local` and set:

```env
# MongoDB Atlas connection string
# Replace <username>, <password>, and the cluster URL with your values
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

# SMTP — example for Gmail (requires an App Password, not your regular password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password

# Public site URL (used for sitemap and OG tags)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: rate limit (defaults: 5 requests per 15 minutes)
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MS=900000
```

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App passwords. Generate a password for "Mail".

> **Without SMTP/MongoDB**: The site will still run. The contact form will show a server error when submitted, but all other pages will work fine.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production mode (local)

```bash
npm run build
npm run start
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts Next.js dev server with hot-reload |
| `npm run build` | Builds the production bundle |
| `npm run start` | Starts the production server (run `build` first) |
| `npm run lint` | Runs ESLint across all source files |
| `npm run format` | Formats code with Prettier |
| `npm run seed` | Inserts a sample contact into MongoDB (requires `MONGODB_URI`) |
| `npm test` | Runs Jest unit tests |

---

## Customizing Content

### Update your personal data

All portfolio content is driven by two JSON files:

- **`src/data/resume.json`** — Name, contact info, education, experience, skills
- **`src/data/projects.json`** — Project cards with descriptions, tech stack, metrics

Edit these files and the site will reflect your changes automatically.

### Update project links

In `src/data/projects.json`, replace `"#"` with your actual URLs:

```json
{
  "liveUrl": "https://your-project.com",
  "githubUrl": "https://github.com/your-username/your-repo"
}
```

### Replace images

See `public/images/README.md` for the full image replacement guide. Summary:

| File | Purpose |
|------|---------|
| `public/images/profile.jpg` | Your headshot (400×400px) |
| `public/images/og-default.png` | OpenGraph banner (1200×630px) |
| `public/images/projects/*/cover.png` | Project cover images |
| `public/Prince_Kushwaha_CV.pdf` | Your downloadable CV |

### Enable dark mode

Dark mode is enabled by default (follows system preference). Users can toggle it via the sun/moon icon in the header.

---

## MongoDB Atlas Setup

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a database user with read/write access
3. Whitelist your IP address (or use `0.0.0.0/0` for development)
4. Get your connection string from **Connect → Drivers** and paste it into `MONGODB_URI`

The `contact_submissions` collection and indexes are created automatically on first use. To seed sample data:

```bash
# Requires MONGODB_URI to be set in .env.local
npx dotenv -e .env.local -- node scripts/seed-contact-sample.js
```

---

## Project Structure

```
portfolio-website/
├── .github/workflows/ci.yml   # Lint + build CI
├── public/
│   ├── images/                # Static images (replace placeholders)
│   ├── favicon.svg
│   └── site.webmanifest
├── scripts/
│   └── seed-contact-sample.js # MongoDB seed script
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout, metadata, ThemeProvider
│   │   ├── page.tsx           # Home / Hero
│   │   ├── about/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── api/contact/route.ts  # Contact API (MongoDB + email)
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Timeline.tsx
│   │   ├── Modal.tsx
│   │   ├── ContactForm.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/
│   │   ├── resume.json        # All personal/professional data
│   │   └── projects.json      # Project cards data
│   ├── lib/
│   │   ├── mongodb.ts         # MongoDB connection helper
│   │   ├── mailer.ts          # Nodemailer email helper
│   │   └── rateLimit.ts       # Request rate limiter
│   └── styles/globals.css
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Security Notes

- Contact form is protected by a **honeypot field** and **IP-based rate limiting** (5 requests/15 minutes)
- All user inputs are validated on **both client and server** using Zod
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`) are set via `next.config.js`
- MongoDB URI and SMTP credentials are **never** exposed to the browser

---

## Running Tests

```bash
npm test
```

The test suite includes a unit test for the HTML escaping helper used to sanitize email content.

---

## Troubleshooting

**`npm run build` fails with missing env vars**
→ The build does not require env vars to succeed. If it fails due to type errors, run `npm run lint` first to identify issues.

**Contact form shows "Failed to save"**
→ Check your `MONGODB_URI` in `.env.local` and ensure your IP is whitelisted in MongoDB Atlas.

**Emails not sending**
→ Verify `SMTP_*` values. For Gmail, ensure you are using an App Password (not your account password).

**Images not showing**
→ Replace placeholder images per the instructions in `public/images/README.md`.
