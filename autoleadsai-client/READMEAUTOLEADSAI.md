#  AutoLeads AI

**AutoLeads AI** is an AI-powered lead generation and outreach platform that helps businesses discover high-quality prospects, generate personalized messages, and streamline their customer acquisition process — all in one place.

---

## What it does

AutoLeads AI combines automation, AI, and smart data sourcing to:

*  Discover targeted leads based on niche, location, and keywords
*  Extract and enrich business data from public sources
*  Generate personalized outreach messages using AI
*  Assist with multi-channel outreach (email, social, etc.)
* Organize and manage leads in a clean dashboard
* Automate repetitive prospecting workflows

---

## Why AutoLeads AI?

Traditional lead generation is:

* Time-consuming
* Manual
* Inefficient

AutoLeads AI solves this by turning a simple input like:

> “Fitness coaches in Lagos”

into:

* A list of relevant leads
* Contact information (where available)
* Ready-to-send personalized messages

---

## Key Features

* **AI Lead Discovery** – Find businesses and prospects that match your ideal customer profile
* **Lead Enrichment** – Extract websites, emails, and business details
* **AI Message Generator** – Create human-like, non-spammy outreach messages
* **Campaign Management** – Organize and track outreach efforts
* **Automation Engine** – Powered by workflows for scalability
* **Export & Integrations** – Use your leads anywhere

---

## Tech Stack

* Frontend: React + TypeScript
* Backend Automation: n8n
* Database: PostgreSQL
* AI Engine: Ollama / LLMs
* Infrastructure: Docker

---

## Use Cases

* Freelancers looking for clients
* Agencies doing outreach
* SaaS founders validating ideas
* Small businesses finding customers

---

##  Philosophy

AutoLeads AI focuses on:

* Quality over quantity
* Smart targeting
* Personalized outreach

Not spam or unsafe automation.

---

##  Vision

To become a **complete AI-powered growth engine** that helps individuals and businesses:

* Find opportunities
* Connect intelligently
* Grow faster

---

##  Status
 Currently in development (MVP stage)

---

## Contribution

Contributions, ideas, and feedback are welcome!

---

## 📄 License

MIT License


## CODEBASE STRUCTURE

client/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   └── routes.tsx
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │
│   │   ├── Leads/
│   │   │   ├── LeadFinderPage.tsx
│   │   │   ├── LeadDetailsPage.tsx
│   │   │
│   │   ├── Campaigns/
│   │   │   ├── CampaignsPage.tsx
│   │   │   ├── CampaignDetailsPage.tsx
│   │   │
│   │   ├── Messages/
│   │   │   ├── MessageGeneratorPage.tsx
│   │   │
│   │   ├── Settings/
│   │       ├── SettingsPage.tsx
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │
│   │   ├── leads/
│   │   │   ├── LeadCard.tsx
│   │   │   ├── LeadList.tsx
│   │   │
│   │   ├── campaigns/
│   │   │   ├── CampaignCard.tsx
│   │   │
│   │   ├── messages/
│   │   │   ├── MessageTemplateCard.tsx
│   │   │
│   │   ├── charts/
│   │       ├── StatsChart.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── leads.service.ts
│   │   ├── auth.service.ts
│   │   ├── campaign.service.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useLeads.ts
│   │   ├── useCampaigns.ts
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │
│   ├── types/
│   │   ├── lead.types.ts
│   │   ├── user.types.ts
│   │   ├── campaign.types.ts
│   │
│   ├── utils/
│   │   ├── formatDate.ts
│   │   ├── helpers.ts
│   │
│   ├── styles/
│   │   ├── index.css
│   │
│   └── main.tsx
│
├── package.json
└── vite.config.ts


