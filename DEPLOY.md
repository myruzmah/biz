# HAMZURY — Deploy to Railway

## Prerequisites
- Railway account: https://railway.app (free to start)
- Your Anthropic API key (already in `.env`)

---

## Option A — Railway CLI (fastest, ~5 minutes)

**Step 1:** Get a Railway API token
- Go to https://railway.app → Account Settings → API Tokens → Create Token
- Copy the token

**Step 2:** Open Terminal in this folder and run:
```bash
export RAILWAY_TOKEN=your_token_here
~/.local/bin/railway login --token $RAILWAY_TOKEN
~/.local/bin/railway init       # creates the project
~/.local/bin/railway up         # deploys
```

**Step 3:** Add MySQL database in Railway dashboard
- Railway dashboard → your project → New → Database → MySQL
- Copy the `DATABASE_URL` shown

**Step 4:** Set environment variables in Railway dashboard → Variables:
```
DATABASE_URL=<paste from MySQL service>
ANTHROPIC_API_KEY=<your-anthropic-api-key>
JWT_SECRET=hamzury-prod-secret-change-this-2026-secure
NODE_ENV=production
SITE_URL=https://<your-project>.up.railway.app
```

**Step 5:** Run DB migrations (one time only):
```bash
~/.local/bin/railway run pnpm db:push
```

---

## Option B — GitHub + Railway (recommended for ongoing)

**Step 1:** Create a GitHub repo
- Go to github.com → New repository → name it `hamzury-site` → Create

**Step 2:** Push code to GitHub:
```bash
cd "/Users/MAC/Desktop/HAMZURY SITE/bizdoc_consult-main"
git remote add origin https://github.com/YOUR_USERNAME/hamzury-site.git
git push -u origin main
```

**Step 3:** Connect Railway to GitHub
- railway.app → New Project → Deploy from GitHub repo
- Select `hamzury-site` → Deploy Now

**Step 4:** Add MySQL + set environment variables (same as Option A Step 3–4)

**Step 5:** Run DB migrations:
```bash
~/.local/bin/railway run pnpm db:push
```

---

## Custom Domain (hamzury.com)
1. Railway dashboard → your service → Settings → Domains → Add custom domain
2. Enter `hamzury.com`
3. Railway gives you CNAME records — add them in your domain registrar's DNS
4. Update `SITE_URL=https://hamzury.com` in Railway Variables

---

## Environment Variables Reference

| Variable | Required | Value |
|----------|----------|-------|
| `DATABASE_URL` | ✅ | From Railway MySQL service |
| `ANTHROPIC_API_KEY` | ✅ | Your API key |
| `JWT_SECRET` | ✅ | Any random 32+ char string |
| `NODE_ENV` | ✅ | `production` |
| `SITE_URL` | ✅ | Your full URL (https://...) |
| `PORT` | Auto | Set by Railway automatically |

---

## After Deploy — Seed First Admin

Once deployed, create the first CEO/Founder account via the DB:
```bash
~/.local/bin/railway run node -e "
const bcrypt = require('bcryptjs');
// run: railway run pnpm db:studio   (opens Drizzle Studio to insert manually)
"
```
Or use Drizzle Studio: `railway run pnpm db:studio`

---

## Build Status
- ✅ TypeScript: zero errors
- ✅ Production build: clean (10.09s)
- ✅ All three AI chats tested: Amara (BizDoc), Nova (Systemise), Zara (Skills)
- ✅ SEO: favicon, sitemap, robots.txt, OG images
