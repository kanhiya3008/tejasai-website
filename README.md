# UltraSecure Flutter Kit — Landing Page

Next.js 14 landing page for ultra_secure_flutter_kit SaaS product.

## Project Structure

```
ultrasecurekit/
├── app/
│   ├── layout.tsx       ← Root layout + SEO metadata
│   ├── page.tsx         ← Main page (assembles all components)
│   └── globals.css      ← Global styles + CSS variables
├── components/
│   ├── Navbar.tsx / .module.css
│   ├── Hero.tsx / .module.css
│   ├── Stats.tsx / .module.css
│   ├── Features.tsx / .module.css
│   ├── Pricing.tsx / .module.css   ← Monthly/Annual toggle (React state)
│   ├── Compare.tsx / .module.css
│   ├── Trial.tsx / .module.css     ← Email form + API call
│   ├── FAQ.tsx / .module.css
│   └── Footer.tsx / .module.css
├── package.json
├── next.config.js
└── tsconfig.json
```

## Setup — 5 minutes

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

### 3. Connect your backend (Trial.tsx)
Open `components/Trial.tsx` and replace the URL:
```ts
const res = await fetch('https://your-api.up.railway.app/trial', {
```
→ Replace with your actual Railway backend URL after Phase 2.

### 4. Deploy to Vercel (free)

**Option A — CLI:**
```bash
npm install -g vercel
vercel
# Follow prompts → live in 2 minutes
```

**Option B — Dashboard:**
1. Push this folder to GitHub
2. Go to vercel.com → New Project → Import repo
3. Framework: Next.js (auto-detected)
4. Click Deploy → done

Your site will be live at: `https://ultrasecurekit.vercel.app`

## After deploy — update these

### pub.dev README
Add this to your plugin README:
```markdown
## 🔐 Pricing & License
Free tier available. Pro features require a license key.

[View pricing & get your license →](https://ultrasecurekit.vercel.app)
[Start 14-day free trial (no credit card)](https://ultrasecurekit.vercel.app#trial)
```

### Razorpay (when ready)
In `components/Pricing.tsx`, update the CTA hrefs to point to your Razorpay payment links once created.

## Customisation

- **Colors**: Edit CSS variables in `app/globals.css`
- **Pricing**: Edit prices in `components/Pricing.tsx` (priceNum values)
- **Features**: Edit arrays in `components/Features.tsx` and `Compare.tsx`
- **Contact email**: Search `knhparmar@gmail.com` → replace with your email
- **FAQ**: Edit FAQS array in `components/FAQ.tsx`

## Tech stack
- Next.js 14 (App Router)
- TypeScript
- CSS Modules (zero external CSS libraries)
- Vercel (hosting — free tier)
