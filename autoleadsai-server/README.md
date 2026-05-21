## CAPACITY CALCULATIONS FOR 1,000 USERS
Total users: 1,000
Active users (daily): 30% = 300 users
Peak concurrent users: 20% of daily = 60 users
Scans per user per month (Starter tier): 500 scans
Average scans per user per day: 500 ÷ 30 ≈ 17 scans
Peak hour traffic: 40% of daily traffic



## Scan Processing Capacity
Scans triggered per day: 300 (from 300 active users)
Sources per scan: Average 3 (LinkedIn, Website, Reddit)
Total scraping jobs/day: 300 × 3 = 900 jobs
Jobs per hour (peak): 900 × 0.4 = 360 jobs/hour = 6 jobs/minute

Concurrent scraper workers: 3 instances
Job processing time: ~10 seconds per source
Jobs processed per minute: (3 × 60) ÷ 10 = 18 jobs/minute

System capacity vs demand: 18/min capacity >> 6/min demand 


## Database Capacity
Leads per user per month: 500 scans × 10 leads per scan = 5,000 leads
Total leads after 6 months: 1,000 users × 5,000 × 6 = 30,000,000 leads
Per lead document size: ~2KB
Total DB size: 30M × 2KB = 60GB (well within single MongoDB instance)

## Redis Memory
Queue jobs at peak: ~100 pending jobs × 2KB = 200KB
Cache data (dashboard stats): ~50KB per active user × 300 = 15MB
Session data: ~5KB per active session × 300 = 1.5MB
Total Redis memory needed: ~20MB (with headroom: 256MB allocated)

## Summary: Single Server Capacity
┌─────────────────────────────────────────────────────────┐
│  SERVER SPEC: 4 vCPU, 8GB RAM, 100GB SSD                │
│                                                         │
│  API Requests:    ~1 req/sec (capacity: ~500 req/sec)   │
│  Scraping Jobs:   6/min (capacity: 18/min)              │
│  Database Size:   60GB after 6 months                   │
│  Redis Memory:    20MB (allocated: 256MB)               │
│  CPU Usage:       ~15-20% at peak                       │
│  RAM Usage:       ~3-4GB at peak                        │
│                                                         │
│  VERDICT: Single server handles 1K users comfortably    │
└─────────────────────────────────────────────────────────┘

## COMPLETE BACKEND ARCHITECTURE DIAGRAM
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                             │
│                                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐│
│  │ React        │  │ Mobile       │  │ Third-Party  │  │ External Services        ││
│  │ Dashboard    │  │ Browser      │  │ API Clients  │  │ (Paddle, Slack, CRM)     ││
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘│
│         │                 │                 │                      │               │
└─────────┼─────────────────┼─────────────────┼──────────────────────┼───────────────┘
          │                 │                 │                      │
          ▼                 ▼                 ▼                      ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           NGINX REVERSE PROXY (:80/:443)                             │
│  - SSL Termination                                                                   │
│  - Rate Limiting (100 req/min per IP)                                                │
│  - Static File Serving (React build)                                                 │
│  - Proxy to Express API                                                              │
└─────────────────────────────────────┬───────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              EXPRESS API LAYER (:3000)                               │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │                          MIDDLEWARE PIPELINE                                     │ │
│  │                                                                                  │ │
│  │  Request → CORS → Helmet → Rate Limiter → Body Parser → Auth → Tier Guard → Route│ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                      │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │   AUTH ROUTES        │  │   USER ROUTES        │  │   WEBHOOK ROUTES             │  │
│  │  POST /auth/signup   │  │  GET /user/profile   │  │  POST /webhooks/paddle       │  │
│  │  POST /auth/login    │  │  PUT /user/settings  │  │  POST /webhooks/slack        │  │
│  │  POST /auth/refresh  │  │  GET /user/usage     │  │  POST /webhooks/crm          │  │
│  │  POST /auth/logout   │  │                      │  │                               │  │
│  └─────────┬───────────┘  └─────────┬───────────┘  └──────────────┬────────────────┘  │
│            │                        │                              │                   │
│  ┌─────────┴───────────┐  ┌─────────┴───────────┐  ┌──────────────┴────────────────┐  │
│  │   SCAN ROUTES        │  │   LEAD ROUTES        │  │   DASHBOARD ROUTES           │  │
│  │  POST /scans/trigger │  │  GET /leads          │  │  GET /dashboard/stats        │  │
│  │  GET /scans/history  │  │  GET /leads/:id      │  │  GET /dashboard/pipeline     │  │
│  │  GET /scans/:id      │  │  PUT /leads/:id      │  │  GET /dashboard/analytics    │  │
│  │                       │  │  POST /leads/manual  │  │                               │  │
│  └─────────┬───────────┘  └─────────┬───────────┘  └──────────────┬────────────────┘  │
│            │                        │                              │                   │
└────────────┼────────────────────────┼──────────────────────────────┼───────────────────┘
             │                        │                              │
             ▼                        ▼                              ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              QUEUE LAYER (BULLMQ + REDIS)                            │
│                                                                                      │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐                │
│  │  SCRAPER QUEUE     │  │  LEAD PROCESSING   │  │  NOTIFICATION Q   │                │
│  │                    │  │  QUEUE             │  │                    │                │
│  │  Jobs:             │  │  Jobs:             │  │  Jobs:             │                │
│  │  - trigger_scan    │  │  - score_lead      │  │  - send_slack      │                │
│  │  - linkedin_scan   │  │  - enrich_lead     │  │  - send_email      │                │
│  │  - website_scan    │  │  - dedup_lead      │  │  - crm_sync        │                │
│  │  - reddit_scan     │  │  - qualify_lead    │  │  - follow_up       │                │
│  │                    │  │                    │  │                    │                │
│  │  Priority: normal  │  │  Priority: high    │  │  Priority: normal  │                │
│  │  Concurrency: 3    │  │  Concurrency: 2    │  │  Concurrency: 2    │                │
│  └─────────┬─────────┘  └─────────┬─────────┘  └─────────┬─────────┘                │
│            │                      │                      │                           │
│  ┌─────────┴──────────────────────┴──────────────────────┴─────────────────┐        │
│  │                          REDIS (IN-MEMORY)                               │        │
│  │  - Queue Storage        - Session Cache        - Rate Limit Counters    │        │
│  │  - Dashboard Cache      - API Key Cache        - Usage Trackers         │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
└─────────────────────────────────────┬───────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              WORKER LAYER (PM2 MANAGED)                              │
│                                                                                      │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │ SCRAPER ORCHESTRATOR│  │ SCRAPER WORKERS (x3) │  │ AI SCORING WORKER (x2)      │  │
│  │ (1 instance)        │  │                      │  │                              │  │
│  │                     │  │  ┌─────────────────┐ │  │  - Intent Analysis           │  │
│  │ - Receives scan job │  │  │ LinkedIn Module │ │  │  - Relevance Scoring         │  │
│  │ - Splits by source  │  │  └─────────────────┘ │  │  - Qualification (hot/warm)  │  │
│  │ - Spawns sub-jobs   │  │  ┌─────────────────┐ │  │                              │  │
│  │ - Collects results  │  │  │ Website Module  │ │  │                              │  │
│  │ - Deduplicates      │  │  └─────────────────┘ │  └──────────────┬──────────────┘  │
│  │ - Stores to MongoDB │  │  ┌─────────────────┐ │                 │                 │
│  │ - Emits events      │  │  │ Reddit Module   │ │                 │                 │
│  └─────────┬───────────┘  │  └─────────────────┘ │                 │                 │
│            │               └──────────┬──────────┘                 │                 │
│            │                          │                            │                 │
│  ┌─────────┴───────────┐  ┌──────────┴──────────┐  ┌──────────────┴──────────────┐  │
│  │ EMAIL WORKER (x2)   │  │ FOLLOW-UP WORKER     │  │ NOTIFICATION WORKER (x2)    │  │
│  │                     │  │ (1 instance)         │  │                              │  │
│  │ - Send outreach     │  │ - Check sequences    │  │  - Slack alerts              │  │
│  │ - Track opens       │  │ - Send follow-ups    │  │  - CRM sync (HubSpot, etc)   │  │
│  │ - Handle replies    │  │ - Respect delays     │  │  - Webhook dispatches        │  │
│  └──────────┬──────────┘  └──────────┬──────────┘  └──────────────┬──────────────┘  │
│             │                        │                             │                 │
└─────────────┼────────────────────────┼─────────────────────────────┼─────────────────┘
              │                        │                             │
              ▼                        ▼                             ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                 EVENT BUS                                             │
│                                                                                      │
│  Events Emitted:                                                                     │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │  lead.discovered → lead.scored → lead.qualified.hot → email.sent               │ │
│  │  lead.enriched  → lead.crm.synced → lead.reply.received → lead.converted       │ │
│  │  user.signup    → subscription.created → subscription.canceled                  │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────┬───────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                 DATA LAYER                                            │
│                                                                                      │
│  ┌───────────────────────────────────┐  ┌──────────────────────────────────────────┐│
│  │         MONGODB (PRIMARY)         │  │         MONGODB OPERATIONS               ││
│  │                                   │  │                                          ││
│  │  ┌─────────────────────────────┐  │  │  READS (Dashboard, Lead listing)         ││
│  │  │ Collections:                │  │  │  ┌────────────────────────────────────┐ ││
│  │  │                             │  │  │  │ • Indexed queries (userId+status)  │ ││
│  │  │  • users                    │  │  │  │ • Cached in Redis (5min TTL)       │ ││
│  │  │  • leads                    │  │  │  │ • Paginated (50 per page)          │ ││
│  │  │  • workflows                │  │  │  └────────────────────────────────────┘ ││
│  │  │  • scans                    │  │  │                                          ││
│  │  │  • subscriptions            │  │  │  WRITES (Scans, Events, Logs)            ││
│  │  │  • event_logs               │  │  │  ┌────────────────────────────────────┐ ││
│  │  │  • email_logs               │  │  │  │ • Batch inserts (50 leads at once) │ ││
│  │  │                             │  │  │  │ • Atomic updates ($set, $inc)      │ ││
│  │  └─────────────────────────────┘  │  │  │ • Write concern: majority          │ ││
│  │                                   │  │  └────────────────────────────────────┘ ││
│  │  Indexes:                         │  │                                          ││
│  │  • userId (all collections)       │  │  DELETES (GDPR, Account deletion)        ││
│  │  • email + userId (unique)        │  │  ┌────────────────────────────────────┐ ││
│  │  • status + userId (compound)     │  │  │ • Soft delete (isDeleted: true)    │ ││
│  │  • qualification + userId         │  │  │ • Scheduled cleanup (30 days)      │ ││
│  │  • createdAt (TTL for logs)       │  │  └────────────────────────────────────┘ ││
│  └───────────────────────────────────┘  └──────────────────────────────────────────┘│
│                                                                                      │
│  ┌───────────────────────────────────┐  ┌──────────────────────────────────────────┐│
│  │         REDIS (CACHE)             │  │         REDIS OPERATIONS                 ││
│  │                                   │  │                                          ││
│  │  Cache Keys:                      │  │  ┌────────────────────────────────────┐ ││
│  │  • dashboard:{userId}:stats       │  │  │ SET: Set key with TTL              │ ││
│  │  • session:{sessionId}            │  │  │ GET: Retrieve cached value         │ ││
│  │  • rate:{userId}:{endpoint}        │  │  │ INCR: Increment rate counters     │ ││
│  │  • usage:{userId}:{month}         │  │  │ DEL: Invalidate on update          │ ││
│  │  • scan:dedup:{hash}              │  │  │ EXPIRE: Set TTL for auto-cleanup   │ ││
│  └───────────────────────────────────┘  └──────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────────┘



## AUTHENTICATION SYSTEM DESIGN
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              AUTHENTICATION FLOW                                     │
│                                                                                      │
│  SIGNUP:                                                                             │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │  Client                Express API              MongoDB          Redis          │ │
│  │    │                       │                       │               │            │ │
│  │    │  POST /auth/signup    │                       │               │            │ │
│  │    │  {email, password,    │                       │               │            │ │
│  │    │   firstName, lastName} │                       │               │            │ │
│  │    │ ─────────────────────>│                       │               │            │ │
│  │    │                       │                       │               │            │ │
│  │    │                       │  Check existing user  │               │            │ │
│  │    │                       │ ─────────────────────>│               │            │ │
│  │    │                       │ <─────────────────────│               │            │ │
│  │    │                       │  (not found)          │               │            │ │
│  │    │                       │                       │               │            │ │
│  │    │                       │  Hash password (bcrypt)               │            │ │
│  │    │                       │  Create user document │               │            │ │
│  │    │                       │ ─────────────────────>│               │            │ │
│  │    │                       │ <─────────────────────│               │            │ │
│  │    │                       │  (user created)       │               │            │ │
│  │    │                       │                       │               │            │ │
│  │    │                       │  Generate JWT tokens  │               │            │ │
│  │    │                       │  (access: 15min,      │               │            │ │
│  │    │                       │   refresh: 7 days)    │               │            │ │
│  │    │                       │                       │               │            │ │
│  │    │                       │  Store refresh token  │               │            │ │
│  │    │                       │ ─────────────────────────────────────>│            │ │
│  │    │                       │                       │               │            │ │
│  │    │  201 Created          │                       │               │            │ │
│  │    │  {accessToken,        │                       │               │            │ │
│  │    │   refreshToken, user} │                       │               │            │ │
│  │    │ <─────────────────────│                       │               │            │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                      │
│  LOGIN:                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │  Client                Express API              MongoDB          Redis          │ │
│  │    │                       │                       │               │            │ │
│  │    │  POST /auth/login     │                       │               │            │ │
│  │    │  {email, password}    │                       │               │            │ │
│  │    │ ─────────────────────>│                       │               │            │ │
│  │    │                       │                       │               │            │ │
│  │    │                       │  Find user by email   │               │            │ │
│  │    │                       │ ─────────────────────>│               │            │ │
│  │    │                       │ <─────────────────────│               │            │ │
│  │    │                       │                       │               │            │ │
│  │    │                       │  Compare password     │               │            │ │
│  │    │                       │  (bcrypt.compare)     │               │            │ │
│  │    │                       │                       │               │            │ │
│  │    │                       │  Generate new tokens  │               │            │ │
│  │    │                       │  Store refresh token  │               │            │ │
│  │    │                       │ ─────────────────────────────────────>│            │ │
│  │    │                       │                       │               │            │ │
│  │    │  200 OK               │                       │               │            │ │
│  │    │  {accessToken,        │                       │               │            │ │
│  │    │   refreshToken, user} │                       │               │            │ │
│  │    │ <─────────────────────│                       │               │            │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                      │
│  PROTECTED ROUTE:                                                                    │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │  Client                Middleware              Redis          Controller        │ │
│  │    │                       │                    │               │               │ │
│  │    │  GET /leads           │                    │               │               │ │
│  │    │  Authorization:       │                    │               │               │ │
│  │    │  Bearer {accessToken} │                    │               │               │ │
│  │    │ ─────────────────────>│                    │               │               │ │
│  │    │                       │                    │               │               │ │
│  │    │                       │  Verify JWT        │               │               │ │
│  │    │                       │  Extract userId    │               │               │ │
│  │    │                       │                    │               │               │ │
│  │    │                       │  Check if token    │               │               │ │
│  │    │                       │  is blacklisted    │               │               │ │
│  │    │                       │ ──────────────────>│               │               │ │
│  │    │                       │ <──────────────────│               │               │ │
│  │    │                       │  (not blacklisted) │               │               │ │
│  │    │                       │                    │               │               │ │
│  │    │                       │  req.user = {id,   │               │               │ │
│  │    │                       │    email, tier}    │               │               │ │
│  │    │                       │ ──────────────────────────────────>│               │ │
│  │    │                       │                    │               │               │ │
│  │    │                       │                    │  Query leads  │               │ │
│  │    │                       │                    │  for userId   │               │ │
│  │    │                       │                    │               │               │ │
│  │    │  200 OK               │                    │               │               │ │
│  │    │  {leads: [...]}       │                    │               │               │ │
│  │    │ <──────────────────────────────────────────────────────────│               │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘


## COMPLETE SYSTEM WORKFLOW
## Workflow 1: User Signup

1. User visits React dashboard → fills signup form
2. POST /auth/signup → Express validates input
3. Check MongoDB: email not already registered
4. Hash password with bcrypt (12 rounds)
5. Create user document in MongoDB (tier: 'starter', trial: 14 days)
6. Generate JWT access token (15min) + refresh token (7 days)
7. Store refresh token in Redis (key: refresh:{userId}:{token})
8. Return tokens + user object to client
9. Client stores access token in memory, refresh token in httpOnly cookie
10. Client redirects to onboarding/dashboard


## Workflow 2: Triggering a Scan
1. User clicks "Scan Now" on dashboard
2. POST /scans/trigger { sources: ['linkedin', 'website'] }
3. Auth middleware verifies JWT → extracts userId
4. Tier Guard middleware checks:
   - User's subscription is active
   - User hasn't exceeded monthly scan limit (500 for Starter)
5. Rate limiter checks: max 5 scan triggers per minute per user
6. Controller increments usage counter in Redis
7. Controller pushes job to scraper.queue:
   { jobId, userId, sources, tier }
8. Controller responds 202 Accepted immediately


## Workflow 3: Scraping Execution
1. Scraper Orchestrator Worker picks up job from scraper.queue
2. Reads user's tier to determine allowed sources
3. Creates sub-jobs for each source:
   - linkedin:{userId}:{jobId} → linkedin.scraper.js
   - website:{userId}:{jobId} → website.scraper.js
4. Sub-jobs go to source-specific queues (concurrency controlled)
5. Scraper Workers process sub-jobs:
   a. LinkedIn: Puppeteer opens LinkedIn → searches by criteria → extracts profiles
   b. Website: Cheerio parses HTML → extracts contact info
6. Each scraper module returns raw lead data array
7. Orchestrator collects all sub-job results
8. Deduplication: check Redis cache for previously found leads (by email hash)
9. New leads batch-inserted into MongoDB.leads collection
10. Orchestrator emits event: "leads.discovered" via Event Bus

## Workflow 4: Lead Processing
1. AI Scoring Worker listens for "leads.discovered" event
2. Picks up new leads in batches of 50
3. For each lead:
   a. Calls AI service (OpenAI/Claude) with lead data + scoring prompt
   b. AI returns: intent score (0-100), intent keywords, summary
   c. Calculates relevance score based on user's target criteria
   d. Assigns qualification: hot (>80), warm (50-80), cold (<50)
4. Batch updates MongoDB with scores and qualification
5. Emits event per qualified lead:
   - "lead.qualified.hot" for hot leads
   - "lead.qualified.warm" for warm leads

## Workflow 5: Outreach & Notifications
1. Email Worker listens for "lead.qualified.hot" event
2. Checks user's workflow configuration:
   - Email template selected?
   - Sender email verified?
   - Follow-up sequence defined?
3. Composes personalized email (AI-generated or template)
4. Sends via email provider (SendGrid/Mailgun)
5. Logs to MongoDB.email_logs
6. Emits event: "email.sent"

7. Slack Notifier Worker also listens for "lead.qualified.hot"
8. Checks if user has Slack integration enabled (Pro+ tier)
9. Sends formatted Slack message to user's configured channel
10. Includes: lead name, company, score, quick-action buttons

11. CRM Worker listens for "lead.qualified.hot"
12. If user has CRM connected (Pro+ tier):
    a. Formats lead data per CRM schema
    b. Pushes to HubSpot/Salesforce API
    c. Stores external CRM ID back to MongoDB lead document
13. Emits event: "lead.crm.synced"

## Workflow 6: Follow-Up Sequence
1. Follow-Up Worker runs every 30 minutes (BullMQ repeatable job)
2. Queries MongoDB.email_logs:
   - Find emails sent > 2 days ago with no reply
   - Where follow-up step < user's configured max steps
3. For each matching lead:
   a. Check if lead hasn't replied or been disqualified
   b. Compose next follow-up email (different template per step)
   c. Send email
   d. Update email_logs with new step
   e. Respect user's delay settings (2 days between emails typical)
4. Stop sequence when: reply received, lead disqualified, or max steps reached

## Workflow 7: Dashboard Load
1. User opens React dashboard
2. Client makes parallel requests:
   GET /dashboard/stats
   GET /dashboard/pipeline
   GET /dashboard/recent-leads
3. Express controller checks Redis cache first:
   - Key: dashboard:{userId}:stats (TTL: 5 minutes)
4. If cache HIT → return cached data (2ms response)
5. If cache MISS → query MongoDB with proper indexes:
   - db.leads.aggregate([
       { $match: { userId } },
       { $group: { _id: "$qualification", count: { $sum: 1 } } }
     ])
6. Cache result in Redis with 5-minute TTL
7. Return data to client
8. Client renders charts, pipeline view, lead feed
9. When new data arrives (via worker), cache is invalidated:
   - Worker calls: Redis DEL dashboard:{userId}:stats


## 5. DATABASE SCHEMA RELATIONSHIPS
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           DATABASE SCHEMA RELATIONSHIPS                               │
│                                                                                      │
│  ┌─────────────────┐          ┌─────────────────┐          ┌─────────────────────┐ │
│  │     USERS        │ 1──────N │     LEADS       │ N──────1 │     WORKFLOWS       │ │
│  │                  │          │                  │          │                      │ │
│  │ _id              │          │ _id              │          │ _id                  │ │
│  │ email (unique)   │          │ userId (FK) ─────┼──────────│ userId (FK)          │ │
│  │ passwordHash     │          │ email            │          │ name                 │ │
│  │ firstName        │          │ company          │          │ trigger              │ │
│  │ lastName         │          │ intent.score     │          │ steps[]              │ │
│  │ tier             │          │ relevance.score  │          │ isActive             │ │
│  │ subscription     │          │ qualification    │          │ runCount             │ │
│  │ createdAt        │          │ status           │          │ createdAt            │ │
│  └────────┬────────┘          │ emailHistory[]   │          └─────────────────────┘ │
│           │                   │ externalCrmId    │                                   │
│           │                   │ createdAt        │                                   │
│           │                   └────────┬─────────┘                                   │
│           │                            │                                             │
│           │                   ┌────────┴─────────┐                                   │
│           │ 1──────────N      │                  │      N──────────1                 │
│           │                   │                  │                                   │
│  ┌────────┴────────┐  ┌───────┴───────┐  ┌───────┴───────┐  ┌─────────────────────┐ │
│  │   SCANS          │  │  EMAIL_LOGS  │  │  EVENT_LOGS   │  │   SUBSCRIPTIONS     │ │
│  │                  │  │              │  │               │  │                      │ │
│  │ _id              │  │ _id          │  │ _id           │  │ _id                  │ │
│  │ userId (FK)      │  │ userId (FK)  │  │ userId (FK)   │  │ userId (FK)          │ │
│  │ sources[]        │  │ leadId (FK)  │  │ eventType     │  │ paddleSubscriptionId │ │
│  │ status           │  │ type         │  │ leadId (FK)   │  │ tier                 │ │
│  │ totalFound       │  │ status       │  │ data          │  │ status               │ │
│  │ newLeads         │  │ sentAt       │  │ createdAt     │  │ currentPeriodEnd     │ │
│  │ results          │  │ openedAt     │  │               │  │ createdAt            │ │
│  │ createdAt        │  │ repliedAt    │  │               │  └─────────────────────┘ │
│  └──────────────────┘  └─────────────┘  └───────────────┘                           │
│                                                                                      │
│  INDEX STRATEGY:                                                                     │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │  users:         { email: 1 } unique                                              │ │
│  │  leads:         { userId: 1, qualification: 1 }   ← Dashboard hot leads         │ │
│  │                 { userId: 1, status: 1 }           ← Pipeline view              │ │
│  │                 { userId: 1, createdAt: -1 }       ← Recent leads               │ │
│  │                 { email: 1, userId: 1 } unique     ← Deduplication              │ │
│  │  scans:         { userId: 1, createdAt: -1 }       ← Scan history               │ │
│  │  workflows:     { userId: 1, isActive: 1 }         ← Active workflows           │ │
│  │  email_logs:    { userId: 1, leadId: 1 }          ← Lead email history          │ │
│  │                 { status: 1, sentAt: 1 }           ← Follow-up queries           │ │
│  │  event_logs:    { createdAt: 1 }, { expireAfterSeconds: 2592000 }  ← 30 day TTL │ │
│  │  subscriptions: { userId: 1 } unique               ← User's subscription        │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘



## 6. SINGLE SERVER PROCESS LAYOUT
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                     SINGLE VPS SERVER (4 vCPU, 8GB RAM, 100GB SSD)                    │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              NGINX (Port 80/443)                                │ │
│  │  - Static files: /var/www/dashboard/build                                       │ │
│  │  - Proxy: /api/* → http://localhost:3000                                        │ │
│  │  - Rate limit: 100 req/min per IP                                               │ │
│  │  - Gzip compression                                                             │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│                                        │                                             │
│  ┌─────────────────────────────────────┼──────────────────────────────────────────┐ │
│  │                          PM2 PROCESS MANAGER                                    │ │
│  │                                      │                                          │ │
│  │  ┌──────────────────────────────────┴───────────────────────────────────────┐  │ │
│  │  │  API CLUSTER (2 instances)              CPU: ~10%    RAM: ~200MB each     │  │ │
│  │ 





# AutoLeadsAI Server - Dependencies

## Production Dependencies

### Core Framework
| Package | Purpose |
|---------|---------|
| `express` | Web framework for building the REST API |
| `mongoose` | MongoDB ODM for schema modeling and database operations |
| `redis` | Redis client library required by BullMQ for queue operations |
| `bullmq` | Job queue system built on Redis for background processing |
| `ioredis` | Advanced Redis client used for caching, sessions, and pub/sub |

### Security & Authentication
| Package | Purpose |
|---------|---------|
| `bcryptjs` | Password hashing with salt (12 rounds) |
| `jsonwebtoken` | JWT access token (15min) and refresh token (7 days) generation and verification |
| `helmet` | Sets secure HTTP headers to protect against common web vulnerabilities |
| `cors` | Cross-Origin Resource Sharing configuration for the API |
| `express-rate-limit` | Rate limiting middleware to prevent abuse (per user, per endpoint) |

### Data & Validation
| Package | Purpose |
|---------|---------|
| `dotenv` | Loads environment variables from `.env` files |
| `express-validator` | Request body, query, and param validation for all endpoints |
| `uuid` | Generates unique IDs for jobs, events, and logging |

### HTTP & External Integration
| Package | Purpose |
|---------|---------|
| `axios` | HTTP client for calling external APIs (CRM, Slack, n8n, billing) |
| `nodemailer` | Email transport for outreach and notification emails |
| `handlebars` | Email template engine for personalized outreach |

### Scraping
| Package | Purpose |
|---------|---------|
| `cheerio` | Fast HTML parser for static website scraping |
| `puppeteer-extra` | Headless Chrome browser for JavaScript-rendered websites |
| `puppeteer-extra-plugin-stealth` | Anti-detection plugin for Puppeteer to avoid bot blocking |

### Logging & Performance
| Package | Purpose |
|---------|---------|
| `pino` | High-performance structured JSON logger |
| `pino-pretty` | Pretty-prints Pino logs for development readability |
| `compression` | Gzip compression middleware for response payloads |
| `morgan` | HTTP request logger for development |

### n8n Integration (AI Engine)
| Package | Purpose |
|---------|---------|
| `n8n-core` | n8n workflow engine for executing AI processing workflows |
| `n8n-workflow` | n8n workflow definitions and node specifications |

---

## Dev Dependencies

| Package | Purpose |
|---------|---------|
| `nodemon` | Auto-restarts the server on file changes during development |
| `jest` | Testing framework for unit, integration, and e2e tests |
| `supertest` | HTTP assertion library for testing API endpoints |
| `mongodb-memory-server` | Spins up an in-memory MongoDB instance for testing |
| `eslint` | JavaScript linting for code quality and consistency |
| `prettier` | Code formatter for consistent styling |
| `eslint-config-prettier` | Makes ESLint and Prettier work together without conflicts |
| `cross-env` | Sets environment variables across Windows/Mac/Linux |

---

## Install Commands

### Production
```bash
npm install express mongoose redis bullmq axios dotenv cors helmet bcryptjs jsonwebtoken express-rate-limit express-validator compression morgan pino pino-pretty uuid nodemailer handlebars cheerio puppeteer-extra puppeteer-extra-plugin-stealth ioredis n8n-core n8n-workflow