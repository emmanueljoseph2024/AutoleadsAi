// src/components/leads/LeadDetailPanel.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMail,
  FiMapPin,
  FiCalendar,
  FiExternalLink,
  FiCpu,
  FiAlertCircle,
  FiRefreshCw,
  FiEdit3,
  FiUserPlus,
} from 'react-icons/fi';
import Button from '../common/Button';
import Card from '../common/Card';
import CopyButton from '../common/CopyButton';
import Spinner from '../common/Spinner';
import LeadStatusBadge from './LeadStatusBadge';
import LeadScoreBreakdown from './LeadScoreBreakdown';
import LeadInsightCard from './LeadInsightCard';
import LeadMessageGenerator from './LeadMessageGenerator';
import LeadTimeline from './LeadTimeline';
import LeadSourceLink from './LeadSourceLink';
import { sanitizeString } from '../../utils/sanitizers';
import { formatDate } from '../../utils/formatDate';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  sourceUrl: string;
  nicheId?: string;
  qualification: 'hot' | 'warm' | 'cold';
  status: string;
  intent?: {
    score: number;
    keywords: string[];
    summary: string;
  };
  relevance?: {
    score: number;
    factors: {
      industryMatch: boolean;
      roleMatch: boolean;
      geoMatch: boolean;
    };
  };
  emailHistory?: {
    emailId: string;
    type: string;
    sentAt: string;
    status: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface Insight {
  _id: string;
  type: 'lead_analysis' | 'approach_strategy' | 'message_template' | 'category_analysis';
  title: string;
  content: string;
  suggestedMessage?: string;
  tone?: string;
  keyPoints: string[];
  leadCategory?: string;
  confidence: number;
  createdAt: string;
}

interface TimelineEvent {
  type: 'email_sent' | 'email_opened' | 'email_replied' | 'status_change' | 'lead_created';
  title: string;
  description?: string;
  timestamp: string;
  status?: string;
}

interface LeadDetailPanelProps {
  leadId: string;
}

const LeadDetailPanel = ({ leadId }: LeadDetailPanelProps) => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generatingInsight, setGeneratingInsight] = useState(false);

  const fetchLeadDetail = async () => {
    setLoading(true);
    setError('');
    try {
      const [leadRes, insightsRes] = await Promise.all([
        api.get(API_ENDPOINTS.LEADS.BY_ID(leadId)),
        api.get(`${API_ENDPOINTS.LEADS.BY_ID(leadId)}/insights`),
      ]);

      const leadData = leadRes.data.lead;
      setLead(leadData);
      setInsights(insightsRes.data.insights || []);

      // Build timeline from lead data
      const events: TimelineEvent[] = [
        {
          type: 'lead_created',
          title: 'Lead Discovered',
          description: `Found via ${leadData.source}`,
          timestamp: leadData.createdAt,
        },
      ];

      if (leadData.emailHistory) {
       leadData.emailHistory.forEach((email: { emailId: string; type: string; sentAt: string; status: string }) => {
          events.push({
            type: `email_${email.status}` as TimelineEvent['type'],
            title: `Email ${email.status.charAt(0).toUpperCase() + email.status.slice(1)}`,
            description: `${email.type.replace(/_/g, ' ')} email`,
            timestamp: email.sentAt,
            status: email.status,
          });
        });
      }

      events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setTimeline(events);
    } catch (err: any) {
      setError('Failed to load lead details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadDetail();
  }, [leadId]);

  const handleGenerateInsight = async () => {
    setGeneratingInsight(true);
    try {
      await api.post(`${API_ENDPOINTS.LEADS.BY_ID(leadId)}/insights`);
      await fetchLeadDetail();
    } catch (err: any) {
      setError('Failed to generate insight.');
    } finally {
      setGeneratingInsight(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-[#6B7280]">Loading lead details...</p>
        </div>
      </div>
    );
  }

  if (error && !lead) {
    return (
      <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm animate-scale-in">
        <FiAlertCircle className="w-5 h-5 shrink-0" />
        <span>{error}</span>
        <button onClick={fetchLeadDetail} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
          <FiRefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
      {/* Left Column — Lead Info */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        {/* Header */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                {sanitizeString(lead.name || 'Unknown Lead')}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <LeadStatusBadge status={lead.status} qualification={lead.qualification} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/leads/${lead._id}/edit`}>
                <Button variant="outline" size="sm" icon={<FiEdit3 className="w-3.5 h-3.5" />}>
                  Edit
                </Button>
              </Link>
              <Button variant="outline" size="sm" icon={<FiUserPlus className="w-3.5 h-3.5" />}>
                Assign
              </Button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-sm text-[#374151]">{sanitizeString(lead.email)}</span>
                <CopyButton text={lead.email} />
              </div>
              {lead.company && (
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 text-[#9CA3AF]" />
                  <span className="text-sm text-[#374151]">{sanitizeString(lead.company)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-sm text-[#374151]">
                  Discovered {formatDate(lead.createdAt, 'relative')}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <LeadSourceLink source={lead.source} sourceUrl={lead.sourceUrl} />
              <div className="flex items-center gap-2">
                <FiExternalLink className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-sm text-[#374151]">
                  Last updated {formatDate(lead.updatedAt, 'relative')}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Score Breakdown */}
        <Card title="Lead Scoring">
          <LeadScoreBreakdown
            intentScore={lead.intent?.score || 0}
            relevanceScore={lead.relevance?.score || 0}
            intentKeywords={lead.intent?.keywords}
            intentSummary={lead.intent?.summary}
            relevanceFactors={lead.relevance?.factors}
          />
        </Card>

        {/* AI Insights */}
        <Card
          title="AI Insights"
          action={
            <Button
              size="sm"
              variant="ghost"
              onClick={handleGenerateInsight}
              loading={generatingInsight}
              icon={<FiCpu className="w-3.5 h-3.5" />}
            >
              {generatingInsight ? 'Generating...' : 'Generate New'}
            </Button>
          }
        >
          {insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight) => (
                <LeadInsightCard key={insight._id} insight={insight} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FiCpu className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
              <p className="text-sm text-[#6B7280]">No insights yet</p>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Generate AI insights to learn more about this lead
              </p>
            </div>
          )}
        </Card>

        {/* Timeline */}
        <Card title="Activity Timeline">
          <LeadTimeline events={timeline} />
        </Card>
      </div>

      {/* Right Column — Actions */}
      <div className="space-y-4 sm:space-y-6">
        {/* Message Generator */}
        <Card title="Generate Message">
          <LeadMessageGenerator
            leadId={lead._id}
            leadName={lead.name}
            platforms={['linkedin', 'email', 'facebook', 'twitter', 'instagram']}
          />
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              icon={<FiEdit3 className="w-4 h-4" />}
            >
              Mark as Contacted
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              icon={<FiUserPlus className="w-4 h-4" />}
            >
              Assign to Team Member
            </Button>
            {lead.sourceUrl && (
              <a
                href={lead.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  icon={<FiExternalLink className="w-4 h-4" />}
                >
                  View Original Source
                </Button>
              </a>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LeadDetailPanel;