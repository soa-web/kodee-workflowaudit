# Kodee Preview — AI-Powered Idea-to-Preview Lead Magnet

A Next.js-inspired React + Express web app that generates beautiful, realistic HTML dashboard mockups in 30 seconds using Anthropic's Claude API. Business owners describe their workflow problem, and the app instantly creates a visual preview of what their custom-built solution could look like.

**Live Site:** `preview.kodee.co` (Vercel deployment)

---

## 🎯 What It Does

1. **User lands** on the form page
2. **Selects their industry** (F&B, Clinic, Education, Retail, Logistics, Services, Fitness, Real Estate, Other)
3. **Describes their workflow problem** in a textarea
4. **Clicks "Visualise my solution"**
5. **App generates** a full, realistic HTML dashboard mockup using Claude API
6. **Preview renders** live in an iframe
7. **Two CTAs** push them toward Kodee's paid services

---

## 🏗️ Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | React 19 + TypeScript | Fast, type-safe UI |
| Styling | Tailwind CSS 4 | Rapid design iteration |
| Backend | Express.js | Simple API routing |
| AI | Anthropic Claude Sonnet 4 | Generates realistic HTML mockups |
| Hosting | Vercel | Fast deployment, serverless functions |
| Fonts | Google Fonts (Instrument Serif + Sora) | Premium typography |

---

## 📁 Project Structure

```
kodee-preview/
├── client/
│   ├── public/              # Static assets (favicon, robots.txt only)
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx     # Main landing + form page
│   │   ├── components/
│   │   │   ├── IndustryChips.tsx      # Industry selector
│   │   │   ├── LoadingScreen.tsx      # Loading animation
│   │   │   ├── PreviewFrame.tsx       # iframe renderer
│   │   │   ├── ResultBar.tsx          # Preview header
│   │   │   ├── CTAStrip.tsx           # Bottom CTA section
│   │   │   └── ProofStrip.tsx         # Testimonials
│   │   ├── lib/
│   │   │   └── prompt.ts              # Prompt generator
│   │   ├── App.tsx          # Router
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles + design tokens
│   └── index.html           # HTML template
├── server/
│   └── index.ts             # Express server + /api/generate route
├── vercel.json              # Vercel function timeout config
├── .env.local.example       # Environment variables template
├── vite.config.ts           # Vite configuration
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (with pnpm or npm)
- Anthropic API key (get from https://console.anthropic.com/)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/soa-web/kodee-workflowaudit.git
   cd kodee-workflowaudit
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Create `.env.local` file:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Add your Anthropic API key to `.env.local`:**
   ```
   ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   ```

5. **Start the dev server:**
   ```bash
   pnpm dev
   ```

6. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 🎨 Design System

The app uses **Warm Minimalism** as its design philosophy — balancing clarity with warmth through earthy, amber tones and generous whitespace.

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--kodee-ink` | `#1A1208` | Headings, primary text |
| `--kodee-cream` | `#FBF8F3` | Page background |
| `--kodee-warm` | `#F5EFE4` | Card backgrounds, hover states |
| `--kodee-amber` | `#E07A1F` | Primary CTA, highlights |
| `--kodee-amber-light` | `#FEF3E2` | Selected chip background |
| `--kodee-amber-dark` | `#B85E0D` | Button hover state |
| `--kodee-muted` | `#7A6F60` | Secondary text |
| `--kodee-border` | `#E5DDD0` | Card borders, dividers |
| `--kodee-white` | `#FFFFFF` | Form cards |

### Typography

- **Headings:** Instrument Serif (serif, 700 weight, italic for emphasis)
- **Body:** Sora (sans-serif, 400 weight, 1.6 line-height)
- **UI Labels:** Sora, 500 weight, 0.95rem

### Key Components

**IndustryChips** — 3-column grid of emoji + label buttons. Selected state shows amber background.

**LoadingScreen** — Full-page overlay with amber spinning ring and sequential step reveals (0.8s, 2.2s, 3.8s delays).

**PreviewFrame** — Renders generated HTML in iframe using `srcdoc` attribute. 65vh height, 100% width.

**ResultBar** — Dark header (#1A1208) with "Your Preview" badge and "Make it real with Kodee" CTA.

**CTAStrip** — White footer with "Love what you see?" heading and two buttons: "Try another idea" (ghost) and "Let Kodee build it" (amber).

**ProofStrip** — Three proof points with amber dot bullets below the form.

---

## 🔌 API Route: `/api/generate`

**Endpoint:** `POST /api/generate`

**Request Body:**
```json
{
  "industry": "F&B / Café",
  "problem": "I want a dashboard where staff log tasks each day..."
}
```

**Response (Success):**
```json
{
  "html": "<!DOCTYPE html>..."
}
```

**Response (Error):**
```json
{
  "error": "Invalid input"
}
```

**Implementation:** Located in `server/index.ts`. The route:
1. Validates input (industry required, problem ≥ 20 chars)
2. Generates a detailed prompt using the problem context
3. Calls Anthropic API with `claude-sonnet-4-20250514`
4. Cleans up markdown code fences if present
5. Validates HTML output
6. Returns raw HTML string

---

## 📋 Page Flow

### Screen 1: Form (Default State)

**URL:** `/`

**Elements:**
- Sticky top nav with Kodee logo + "Free Preview" badge
- Hero headline: "See your solution before you build it"
- Hero subheading with value proposition
- White form card with:
  - Industry chip selector (3-column grid)
  - Divider
  - Problem textarea
  - Error message box (if validation fails)
  - Submit row with "Takes ~30 seconds" note + CTA button
- Proof strip with 3 testimonial points

**Validation:**
- Industry chip must be selected
- Problem textarea must be ≥ 20 characters
- Errors shown in red box below textarea

### Screen 2: Loading

**Triggered:** On form submit (after validation passes)

**Elements:**
- Full-page overlay (cream background)
- Centered amber spinning ring
- Heading: "Designing your solution…"
- Subheading: "This takes about 20–30 seconds"
- Three steps that fade in sequentially:
  - ✦ Understanding your business context (0.8s delay)
  - ✦ Designing the interface layout (2.2s delay)
  - ✦ Adding realistic sample data (3.8s delay)

### Screen 3: Preview Result

**Triggered:** On successful API response

**Elements:**
- Dark result bar (#1A1208) with:
  - Amber "Your Preview" badge
  - Label: "What your [Industry] tool could look like"
  - "Make it real with Kodee" CTA (links to kodee.co)
- Full-width iframe (65vh height) with generated HTML
- White CTA strip with:
  - "Love what you see?" heading + description
  - "Try another idea" button (ghost style)
  - "Let Kodee build it" button (amber, links to kodee.co)

---

## 🧠 Claude Prompt Design

The prompt instructs Claude to generate:

1. **Design Elements:**
   - Modern, clean Google Font (not Inter/Roboto)
   - Sidebar or top navigation
   - 3–4 metric cards with realistic SGD numbers
   - Data table or card grid (6–8 rows)
   - Supporting panel (form, filter bar, etc.)
   - Color-coded status badges
   - Industry-appropriate color scheme
   - Hover states and clean shadows

2. **Data:**
   - Singapore context (SGD, local names, terminology)
   - Directly related to the user's problem

3. **Technical:**
   - Raw HTML only (no markdown)
   - All CSS in one `<style>` tag
   - All JS in one `<script>` tag
   - Google Fonts @import only
   - Vanilla JavaScript (no libraries)
   - Interactive elements (tabs, checkboxes, etc.)

---

## 🚢 Deployment to Vercel

### Prerequisites

- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- Custom domain `preview.kodee.co` configured

### Steps

1. **Add environment variable to Vercel:**
   - Go to Vercel Project Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your API key value

2. **Configure custom domain:**
   - Vercel Project Settings → Domains
   - Add `preview.kodee.co`
   - Update DNS CNAME: `preview` → `cname.vercel-dns.com`

3. **Deploy:**
   - Push to GitHub (main branch)
   - Vercel auto-deploys on push
   - Or manually trigger deploy in Vercel dashboard

4. **Verify deployment:**
   - Visit https://preview.kodee.co
   - Test full flow: form → loading → preview

### Vercel Function Timeout

The `vercel.json` file sets function timeout to 60 seconds to accommodate Anthropic API calls (typically 20–30 seconds).

---

## 📝 Environment Variables

Create a `.env.local` file (or add to Vercel):

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Never commit `.env.local` to version control.** Use `.env.local.example` as a template.

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Form validation: empty industry shows error
- [ ] Form validation: problem < 20 chars shows error
- [ ] Form submit: loading screen appears
- [ ] Loading screen: spinner animates, steps fade in sequentially
- [ ] API call: completes in < 30 seconds
- [ ] Preview renders: iframe shows generated HTML
- [ ] "Try another idea": resets form, returns to Screen 1
- [ ] "Make it real with Kodee": links to https://kodee.co
- [ ] Mobile responsive: form stacks to single column
- [ ] Error handling: API failure shows error message

---

## 🔒 Security Notes

- **API Key Protection:** Anthropic API key is stored server-side only (in `server/index.ts`). Never expose in frontend code.
- **Sandbox Attribute:** iframe uses `sandbox="allow-scripts"` to restrict generated HTML capabilities.
- **Input Validation:** Problem textarea validated for minimum length (20 chars) to prevent spam/abuse.

---

## 📚 References

- **Anthropic API Docs:** https://docs.anthropic.com/
- **Claude Model:** claude-sonnet-4-20250514
- **Vercel Docs:** https://vercel.com/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com

---

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit with clear messages: `git commit -m "Add feature: description"`
4. Push to GitHub: `git push origin feature/your-feature`
5. Create a Pull Request

---

## 📄 License

MIT License — See LICENSE file for details.

---

## 🎯 Success Metrics

The app succeeds when:

- Business owner fills form in < 2 minutes
- Preview generates in < 30 seconds
- Preview looks real enough to trigger "wow, that's what I want"
- User clicks "Let Kodee build it" and reaches out
- Kodee closes them as a DFY client ($3,000–$15,000 project)

---

**Built with ❤️ for Singapore SMEs**
