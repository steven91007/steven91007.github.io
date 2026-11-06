# Spec: LINE Order Agent — animated demo

Page: `src/pages/projects/ai-powered-order-automation-platform.astro` · Component: `src/components/AgentRun.astro` · Data: `src/data/line-order-run.json`

## What the demo shows

A replay of one recorded pipeline run, in three panels:

1. **Customer chat** — LINE messages arrive one by one.
2. **Agent pipeline** — Paste log → Sanitize → Extract → Recall → Rules → Dedup → Human gate → Write sheet.
3. **Google Sheet** — the order form is auto-filled: one row per order, all 12 columns A:L, typed cell by cell
   (the sheet scrolls horizontally with the cursor). Status goes from `review` to `approved`.

Two cases loop automatically: ① one order over five messages, ② two recipients + an amendment + a non-buyer.

## Data rules

- **Currency is euro (€).** No `$` or NT$ prices anywhere in the site.
- **Names and phone numbers are masked with XXXX in the data itself**, e.g. `Mia SXXXX`, `0151XXXX567`.
  The component shows them as-is; there is no blur toggle. Addresses are fictional Berlin addresses and not masked.
- `columns` lists the 12 sheet headers (A:L). Each `row` event's `cells` is an **array in that same order**.
  The component looks values up by header name (`C('Recipient')`), never by object key.
- Customer names are fictional; the stages and what each stage decided come from a real run.

## Removed

- The old step-through demo at `public/demos/line-order-agent/` and its link on the project page.

## Environment

- Node **>= 22.23.4** (required by Astro, see `package.json` `engines`). Node is installed from the NodeSource apt repo:
  `sudo apt-get update && sudo apt-get install -y nodejs`
- CI (`.github/workflows/deploy.yml`) builds with Node 24.

## Release workflow — local first, then cloud

Pushing to `main` deploys to GitHub Pages immediately, so every change is checked locally first:

1. `node -v` — must be >= 22.23.4.
2. `npm run build` — must finish with `Complete!` and no errors.
3. `npx astro dev` and open <http://localhost:4321/projects/ai-powered-order-automation-platform/>. Check:
   - chat messages appear and the emoji are stripped at the Sanitize stage;
   - each pipeline stage turns green / amber in order;
   - **the sheet fills in rows A:L** and each row ends `approved`;
   - prices show €, names and phones show XXXX;
   - both cases play (tabs, Pause, Restart, speed 1×/2×/4× work);
   - no errors in the browser console.
   - **On the phone (Tailscale):** Tailscale runs on Windows, the dev server runs inside WSL. Start the server with
     `npx astro dev --host 0.0.0.0 --port 4321 --allowed-hosts desktop-htc5rqi-1.tail546de3.ts.net`, then in Windows run
     `tailscale serve --bg 4321` and open <https://desktop-htc5rqi-1.tail546de3.ts.net/projects/ai-powered-order-automation-platform/>
     (tailnet only). Turn it off with `tailscale serve --https=443 off`.
4. Only after the owner has confirmed locally: commit, then `git push` to `main` (this triggers the deploy).
