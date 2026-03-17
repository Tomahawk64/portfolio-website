# Portfolio Images

This folder contains all portfolio images. Replace the placeholder files below with your actual images.

## Directory Structure

```
public/
├── images/
│   ├── profile.jpg              ← Replace with your headshot (recommended: 400×400px)
│   ├── og-default.png           ← OpenGraph default image (recommended: 1200×630px)
│   └── projects/
│       ├── rg-consultancy/
│       │   ├── cover.png        ← Project cover image (recommended: 800×450px)
│       │   └── screen1.png      ← Additional screenshot
│       ├── rg-care/
│       │   ├── cover.png
│       │   └── screen1.png
│       ├── rg-us-debt/
│       │   ├── cover.png
│       │   └── screen1.png
│       └── lms/
│           ├── cover.png
│           └── screen1.png
```

## How to Replace Images

1. **Profile photo**: Save your headshot as `public/images/profile.jpg`
2. **OpenGraph image**: Create a 1200×630 banner and save as `public/images/og-default.png`
3. **Project images**: Place project screenshots in the corresponding folder
4. **CV**: Replace `public/Prince_Kushwaha_CV.pdf` with your actual CV PDF

## Image Guidelines

- Use **WebP** or **PNG** format for screenshots
- Use **JPEG** for photos (compress to < 200KB)
- Recommended dimensions are listed above
- Next.js Image component will handle optimization automatically
