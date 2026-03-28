# Sai Sanket Insurance — Website

Official website for **Sai Sanket Insurance**, Thane West, Maharashtra.

🌐 **Live at:** [your-domain.com](https://your-domain.com) *(update once domain is connected)*

---

## 📋 About

A fully responsive, multi-section insurance business website with:
- LIC Life Insurance plans & details
- Star Health Insurance plans & details
- Vehicle Insurance (Car, Bike, Commercial)
- SIP & Mutual Fund investment section with live calculator
- Contact form with WhatsApp integration
- Floating WhatsApp button
- Google Maps embed
- Enquiry modal popup for each plan
- Mobile-responsive design

---

## 🚀 Quick Deploy via GitHub Pages

### Step 1 — Upload to GitHub

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **"New repository"**
3. Name it: `sai-sanket-insurance` (or any name you like)
4. Set it to **Public**
5. Click **"Create repository"**
6. Upload all files from this folder to the repository

### Step 2 — Enable GitHub Pages

1. In your repository, click **Settings**
2. Scroll to **"Pages"** in the left menu
3. Under **Source**, select `main` branch and `/ (root)` folder
4. Click **Save**
5. Your site will be live at: `https://yourusername.github.io/sai-sanket-insurance/`

### Step 3 — Connect GoDaddy Domain

1. Go to your **GoDaddy account → DNS Management** for your domain
2. Add a **CNAME record**:
   - Host: `www`
   - Points to: `yourusername.github.io`
3. Add an **A record** (for apex/root domain):
   - Host: `@`
   - Points to: `185.199.108.153`
   - Also add: `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. In GitHub repository → **Settings → Pages → Custom domain**, enter your domain
5. Check **Enforce HTTPS** (after DNS propagates, usually 1–24 hours)

---

## 📁 File Structure

```
sai-sanket-insurance/
├── index.html          ← Main website (all sections)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← All JavaScript (tabs, calculator, forms)
├── images/
│   └── favicon.svg     ← Site icon
└── README.md           ← This file
```

---

## ✏️ How to Update Content

### Change phone number / email
Open `index.html` and search for `9867431898` — replace with new number.
Search for `Dhapatkarravindra@gmail.com` — replace with new email.

### Add a new LIC plan
In `index.html`, find the `<!-- LIC SECTION -->` comment.
Copy any existing `<div class="plan-detail" id="lic-...">` block and modify it.
Also add a matching `<button class="plan-nav-btn">` in the `plans-nav` div.

### Change office address
Search for `Ganesh Chowk, Kisan Nagar` in `index.html` and update all instances.

### Update WhatsApp number
Search for `919867431898` in `index.html` and `js/main.js` — replace with your number (country code + number, no +).

---

## 📞 Contact Details (current)

- **Phone/WhatsApp:** +91 98674 31898
- **Email:** Dhapatkarravindra@gmail.com
- **Office:** Shop No. 4, Utkal Sadan, Ganesh Chowk, Kisan Nagar No. 3, Thane West – 400 604, Maharashtra
- **Hours:** Monday–Saturday 10:00 AM – 7:00 PM

---

## ⚠️ Disclaimer Note

The website includes an auto-generated disclaimer: *"Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing."* — this is required by SEBI/IRDAI guidelines.

---

*Built with ❤️ for Sai Sanket Insurance, Thane.*
