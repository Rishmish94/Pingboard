# PingBoard 🟢

> Uptime monitoring and status page SaaS for Indian startups.
> INR pricing · Razorpay payments · Built in public.

**Live at:** pingboard.co.in (coming soon)

---

## What is PingBoard

PingBoard monitors your websites and APIs every 30 seconds to 5 minutes.
If anything goes down — you get alerted instantly via email, Slack, or webhook.
Every customer gets a branded public status page to communicate incidents transparently.

**The gap it fills:** Every existing uptime monitor (Instatus, Hyperping, BetterStack)
charges in USD with no Razorpay or UPI support. PingBoard is India-first.

---

## Tech Stack

| Layer | Technology |
|---|---|
| API Server | Node.js + Fastify |
| Probe Runner | Go (single binary) |
| Frontend | Next.js 15 |
| Database | PostgreSQL 16 |
| Queue | Redis + BullMQ |
| Infrastructure | Hetzner Cloud + k3s |
| IaC | Terraform |
| GitOps | ArgoCD |
| Observability | Prometheus + Grafana + Loki |
| CI/CD | GitHub Actions |
| Payments | Razorpay (INR) + Stripe (USD) |

---

## Architecture

Customer adds URL → Scheduler pushes job to Redis queue

↓

Go probe runner makes HTTP request

↓

Result written to PostgreSQL (up/down/latency)

↓

If down → Alert Worker sends email + Slack + webhook

↓

Status Page (Next.js) shows public incident page

↓

Grafana dashboard shows probe health, SLOs, queue depth

---

## Build Journal

### Day 1 — Docker

**What was built:**
- Node.js + Fastify api-server
- Multi-stage Dockerfile — 208MB image vs 900MB standard approach
- Non-root container user for security
- Layer caching optimised for fast rebuilds
- Image published to GitHub Container Registry

**Key decisions:**
- Alpine Linux base — smallest possible production image
- Multi-stage build — dev tools never reach production image
- `host: 0.0.0.0` — required for container networking
- `.dockerignore` — node_modules and .env excluded from build context

**Run it locally:**
```bash
docker pull ghcr.io/rishmish94/pingboard-api:v1
docker run -d -p 3000:3000 pingboard-api:v1
curl http://localhost:3000/health
```

---

## Repository Structure
pingboard/

└── services/

└── api-server/

├── src/

│   └── index.js

├── package.json

├── Dockerfile

└── .dockerignore

---

*Built by [Rishabh Mishra](https://www.linkedin.com/in/rishmish94)*