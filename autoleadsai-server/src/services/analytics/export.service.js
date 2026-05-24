import { Lead, EmailLog, Scan } from '../../models/index.js';
import { logger } from '../../utils/logger.js';

// ─── CSV Escape Helper ──────────────────────────────

const escapeCsvField = (value) => {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// ─── Export Leads to CSV ────────────────────────────

export const exportLeadsToCSV = async (userId, filters = {}) => {
  try {
    const query = { userId, ...filters };
    const leads = await Lead.find(query).lean();

    if (leads.length === 0) return '';

    const headers = [
      'Name',
      'Email',
      'Company',
      'Source',
      'Source URL',
      'Qualification',
      'Status',
      'Intent Score',
      'Relevance Score',
      'Detail Link',
      'Created At',
    ];

    const rows = leads.map((lead) => [
      escapeCsvField(lead.name),
      escapeCsvField(lead.email),
      escapeCsvField(lead.company),
      escapeCsvField(lead.source),
      escapeCsvField(lead.sourceUrl),
      escapeCsvField(lead.qualification),
      escapeCsvField(lead.status),
      lead.intent?.score || 0,
      lead.relevance?.score || 0,
      `/leads/${lead._id}`,
      lead.createdAt?.toISOString() || '',
    ]);

    return {
      csv: [headers.join(','), ...rows.map((r) => r.join(','))].join('\n'),
      filename: `leads-export-${new Date().toISOString().split('T')[0]}.csv`,
      count: leads.length,
    };
  } catch (error) {
    logger.error(`Failed to export leads for user ${userId}:`, error);
    throw error;
  }
};

// ─── Export Leads to JSON ───────────────────────────

export const exportLeadsToJSON = async (userId, filters = {}) => {
  try {
    const query = { userId, ...filters };
    const leads = await Lead.find(query).select('-__v -refreshTokens').lean();

    return {
      exportedAt: new Date().toISOString(),
      count: leads.length,
      filename: `leads-export-${new Date().toISOString().split('T')[0]}.json`,
      leads: leads.map((lead) => ({
        name: lead.name,
        email: lead.email,
        company: lead.company,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        qualification: lead.qualification,
        status: lead.status,
        intentScore: lead.intent?.score || 0,
        relevanceScore: lead.relevance?.score || 0,
        detailLink: `/leads/${lead._id}`,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
      })),
    };
  } catch (error) {
    logger.error(`Failed to export leads for user ${userId}:`, error);
    throw error;
  }
};

// ─── Export Email Logs to CSV ───────────────────────

export const exportEmailLogsToCSV = async (userId, filters = {}) => {
  try {
    const query = { userId, ...filters };
    const logs = await EmailLog.find(query)
      .populate('leadId', 'name email')
      .lean();

    if (logs.length === 0) return '';

    const headers = [
      'Lead Name',
      'Lead Email',
      'To',
      'Subject',
      'Type',
      'Status',
      'Lead Detail Link',
      'Sent At',
      'Opened At',
      'Replied At',
    ];

    const rows = logs.map((log) => [
      escapeCsvField(log.leadId?.name || ''),
      escapeCsvField(log.leadId?.email || ''),
      escapeCsvField(log.to),
      escapeCsvField(log.subject || ''),
      escapeCsvField(log.type),
      escapeCsvField(log.status),
      log.leadId ? `/leads/${log.leadId._id}` : '',
      log.sentAt?.toISOString() || '',
      log.openedAt?.toISOString() || '',
      log.repliedAt?.toISOString() || '',
    ]);

    return {
      csv: [headers.join(','), ...rows.map((r) => r.join(','))].join('\n'),
      filename: `email-logs-export-${new Date().toISOString().split('T')[0]}.csv`,
      count: logs.length,
    };
  } catch (error) {
    logger.error(`Failed to export email logs for user ${userId}:`, error);
    throw error;
  }
};

// ─── Export Scan History to CSV ─────────────────────

export const exportScanHistoryToCSV = async (userId) => {
  try {
    const scans = await Scan.find({ userId }).sort({ createdAt: -1 }).lean();

    if (scans.length === 0) return '';

    const headers = [
      'Sources',
      'Status',
      'Total Found',
      'New Leads',
      'Detail Link',
      'Started At',
      'Completed At',
      'Created At',
    ];

    const rows = scans.map((scan) => [
      escapeCsvField(scan.sources?.join('; ') || ''),
      escapeCsvField(scan.status),
      scan.totalFound || 0,
      scan.newLeads || 0,
      `/scans/${scan._id}`,
      scan.startedAt?.toISOString() || '',
      scan.completedAt?.toISOString() || '',
      scan.createdAt?.toISOString() || '',
    ]);

    return {
      csv: [headers.join(','), ...rows.map((r) => r.join(','))].join('\n'),
      filename: `scan-history-export-${new Date().toISOString().split('T')[0]}.csv`,
      count: scans.length,
    };
  } catch (error) {
    logger.error(`Failed to export scan history for user ${userId}:`, error);
    throw error;
  }
};

// ─── Export Dashboard Summary to JSON ───────────────

export const exportDashboardSummary = async (userId, stats, pipeline, sourceAnalytics) => {
  try {
    return {
      exportedAt: new Date().toISOString(),
      filename: `dashboard-summary-${new Date().toISOString().split('T')[0]}.json`,
      summary: stats,
      pipeline,
      sourceAnalytics,
    };
  } catch (error) {
    logger.error(`Failed to export dashboard summary for user ${userId}:`, error);
    throw error;
  }
};