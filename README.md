# Aurum Markets — Forex, Gold & Crypto website

Frontend built with **Next.js 15 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.
Responsive for mobile, tablet and desktop. Content comes from the Node.js backend in
[forex-front-end](https://github.com/bariqbilal239-boop/forex-front-end).

## Run

Start the backend first (`npm start` in forex-front-end → http://localhost:5173), then:

```bash
npm install
cp .env.example .env.local   # API_URL=http://localhost:5173
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## How it connects to the backend

- `lib/api.ts` (server-side) loads published posts and site content (hero, disclaimer).
  Pages refresh from the backend every 30 seconds. If the backend is down, the sample content in `lib/data.ts` is shown.
- Contact and newsletter forms post to `/api/backend/*`, which `next.config.ts` proxies to the backend (no CORS needed).
- Posts are managed in the admin panel at `http://localhost:5173/admin.html`.

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero, market overview, featured analysis, FX levels, news, calendar, newsletter |
| `/gold` | Gold rates: chart with time ranges, key levels, local-price calculator, scenarios |
| `/blog` | Analysis library with search, category filters and load more |
| `/blog/[slug]` | Article template (light reading theme) |
| `/news` | Market news with verified/analysis labels and economic calendar |
| `/about` | Mission, team, editorial standards |
| `/contact` | Contact form with validation |

## Structure

```
app/          routes (one folder per page) + globals.css (design tokens)
components/   ui.tsx (shared UI), layout.tsx (header, ticker, tab bar), footer, page widgets
lib/          api.ts (backend client), submit.ts (form posts), data.ts (sample/fallback content), chart.ts
```

All prices are **illustrative sample data** and labelled that way in the UI.
Market prices, news and calendar are still sample data in `lib/data.ts`.
