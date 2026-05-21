# 🎂 Birthday Website — GitHub Pages

A beautiful, animated single-page birthday website built with semantic HTML5, Tailwind CSS, and Vanilla JS.

---

## 📁 File Structure

```
birthday-website/
├── index.html
├── style.css
├── script.js
└── assets/
    └── images/
        ├── photo1.jpg   ← replace with her photos
        ├── photo2.jpg
        ├── photo3.jpg
        ├── photo4.jpg
        └── photo5.jpg
```

---

## ✏️ Quick Customization Checklist

### 1. `script.js` — Top of file, `CONFIG` object
```js
const CONFIG = {
  name:           'Hanna Tamara',       // ← Her name
  birthdayDate:   '2025-11-12',    // ← Her birthday  YYYY-MM-DD
  togetherSince:  '2023-06-14',    // ← Your anniversary YYYY-MM-DD
  countdownMode:  'together',      // 'birthday' → countdown TO birthday
                                   // 'together' → count UP since anniversary
  typewriterLines: [ ... ],        // ← Edit the rotating messages
};
```

### 2. `index.html` — Sections to personalise
| What | Where | How |
|------|-------|-----|
| Gallery photos | `<section id="gallery">` | Replace `src="assets/images/photoN.jpg"` and the caption text |
| YouTube video | `<section id="video">` | Replace `VIDEO_ID` in the iframe src with your unlisted video's ID |
| Letter text | `<section id="letter">` | Edit the paragraphs inside `.letter-body` |
| Your name (letter sign-off) | Same section | Change `"Your Love 💖"` |
| Coupon titles/descriptions | `<section id="coupons">` | Edit `data-emoji`, `data-label`, `.coupon-title`, `.coupon-desc` |
| Nav brand | `<nav>` | Change `"With Love 💕"` |

---

## 🚀 Deploy to GitHub Pages (free)

1. Create a new **public** repo on GitHub, e.g. `happy-birthday-syahira`
2. Push all files (keep the folder structure above)
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your site will be live at: `https://yourusername.github.io/happy-birthday-syahira/`

> **Tip:** Use a private repo + GitHub Pages on a free plan — GitHub Pages on private repos requires GitHub Pro, so keep it public (the URL isn't guessable unless you share it).

---

## 🧩 Libraries Used (all via CDN — no npm needed)

| Library | Purpose |
|---------|---------|
| Tailwind CSS v3 CDN | Utility classes |
| Google Fonts (Poppins + Great Vibes) | Typography |
| Font Awesome 6 | Icons |
| Canvas Confetti | Birthday confetti bursts |

All loaded via `<script>` / `<link>` tags in `index.html` — no build step required.

---

## 🔧 Browser Support

Chrome, Firefox, Safari, Edge (latest). Fully mobile-responsive (tested at 375px width).
