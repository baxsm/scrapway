# Scrapway

A visual web scraping workflow builder. Create scraping tasks, connect them in a flow-based editor, and run them manually or on a schedule.

## Screenshots

![Home](/public/home.png)
![Workflows](/public/workflows.png)
![Workflow Editor](/public/workflows-2.png)
![Credentials](/public/credentials.png)
![Billing](/public/billing.png)

## What it does

- Build scraping workflows visually using a drag-and-drop editor (React Flow)
- Automate browser actions like navigating to URLs, filling inputs, clicking elements, and scrolling
- Extract data from pages as raw HTML, specific text, or using AI-based extraction
- Store results in JSON, deliver via webhook
- Schedule workflows to run automatically with cron jobs
- Manage credentials and billing through the dashboard

## Available tasks

**Browser actions** - Navigate to URL, fill input fields, click elements, scroll to elements

**Data extraction** - Full page HTML, text from specific elements, AI-powered extraction

**Storage** - Read/write properties from JSON files

**Timing** - Wait for elements to appear before continuing

**Delivery** - Send results to a webhook URL

## Tech stack

- Next.js 15, React 19, TypeScript, TailwindCSS, shadcn/ui
- React Flow for the visual editor
- Puppeteer and Cheerio for scraping
- OpenAI for AI-based extraction
- Prisma with PostgreSQL
- Clerk for auth, Stripe for billing

## Getting started

```bash
git clone https://github.com/baxsm/scrapway.git
cd scrapway
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:3000` to start building workflows.
