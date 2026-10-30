# Aurum Markets — Forex, Gold & Crypto website

Frontend built with **Next.js 15 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.
Responsive for mobile, tablet and desktop. The Node.js backend comes next.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

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
lib/          data.ts (sample content), chart.ts (sample chart series)
```

All prices are **illustrative sample data** and labelled that way in the UI.
`lib/data.ts` is the single place to swap in real API data once the backend exists.
