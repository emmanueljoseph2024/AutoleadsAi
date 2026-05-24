# Changelog

All notable changes to AutoLeadsAI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete backend architecture (Express + MongoDB + Redis + BullMQ)
- User authentication system (signup, login, JWT refresh, logout, password reset)
- Multi‑tenant lead management with CRUD operations
- Multi‑source scraping engine (LinkedIn, Facebook, Reddit, Twitter, Instagram, Websites, Google Maps, News, Apollo)
- n8n integration for AI‑powered lead scoring, insights, and message templates
- Niche‑based analytics dashboard with drill‑down links
- 24/7 AI email nurture sequences via n8n
- AI conversation agent for social media DMs (X, Facebook, Instagram)
- Subscription tier system (Starter, Pro, Scale) with Paddle billing
- Slack notifications for hot leads and key events
- CRM sync support (HubSpot, Salesforce, Zoho)
- Team management with lead assignment
- Rate limiting, security headers (Helmet), and CORS configuration
- Docker support with docker‑compose for full stack deployment
- Database seeding, migration, and backup scripts
- Health check endpoint and script
- ESLint + Prettier code quality configuration

### Planned
- Frontend dashboard (React)
- Stripe/Paddle checkout integration in frontend
- Social media OAuth connection flow
- AI conversation agent UI
- Mobile app