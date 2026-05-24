export default {
  apps: [
    // ─── API Server ────────────────────────────────
    {
      name: 'autoleadsai-api',
      script: './server.js',
      instances: 2,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/api-error.log',
      out_file: './logs/api-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      kill_timeout: 10000,
      listen_timeout: 5000,
    },

    // ─── Scraper Orchestrator ──────────────────────
    {
      name: 'autoleadsai-scraper-orchestrator',
      script: './src/workers/scraperOrchestrator.worker.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/scraper-orchestrator-error.log',
      out_file: './logs/scraper-orchestrator-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      kill_timeout: 15000,
    },

    // ─── Lead Processor ────────────────────────────
    {
      name: 'autoleadsai-lead-processor',
      script: './src/workers/leadProcessor.worker.js',
      instances: 2,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/lead-processor-error.log',
      out_file: './logs/lead-processor-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      kill_timeout: 10000,
    },

    // ─── Follow-Up Worker ──────────────────────────
    {
      name: 'autoleadsai-followup',
      script: './src/workers/followUp.worker.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/followup-error.log',
      out_file: './logs/followup-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },

    // ─── CRM Sync Worker ───────────────────────────
    {
      name: 'autoleadsai-crm-sync',
      script: './src/workers/crmSync.worker.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/crm-sync-error.log',
      out_file: './logs/crm-sync-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },

    // ─── Slack Notifier ────────────────────────────
    {
      name: 'autoleadsai-slack',
      script: './src/workers/slackNotifier.worker.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/slack-error.log',
      out_file: './logs/slack-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },

    // ─── Billing Worker ────────────────────────────
    {
      name: 'autoleadsai-billing',
      script: './src/workers/billing.worker.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/billing-error.log',
      out_file: './logs/billing-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },

    // ─── Cleanup Worker ────────────────────────────
    {
      name: 'autoleadsai-cleanup',
      script: './src/workers/cleanup.worker.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/cleanup-error.log',
      out_file: './logs/cleanup-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};