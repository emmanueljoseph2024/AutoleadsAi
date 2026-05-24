// src/components/settings/BillingSettings.tsx

import { Link } from 'react-router-dom';
import { FiCreditCard, FiExternalLink, FiAlertCircle } from 'react-icons/fi';
import Button from '../common/Button';
import Badge from '../common/Badge';
import UsageMeter from '../billing/UsageMeter';
import { formatDate } from '../../utils/formatDate';

interface BillingSettingsProps {
  subscription: {
    tier: 'starter' | 'pro' | 'scale';
    status: 'trialing' | 'active' | 'past_due' | 'canceled';
    currentPeriodEnd?: string;
    trialEnd?: string;
    cancelEffectiveAt?: string;
  };
  usage: {
    scansUsed: number;
    scansLimit: number;
    emailsUsed: number;
    emailsLimit: number;
    teamUsed: number;
    teamLimit: number;
  };
  loading?: boolean;
  onManageBilling?: () => void;
}

const tierLabels: Record<string, string> = {
  starter: 'Starter',
  pro: 'Pro',
  scale: 'Scale',
};

const statusBadges: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  active: 'success',
  trialing: 'info',
  past_due: 'danger',
  canceled: 'neutral',
};

const BillingSettings = ({
  subscription,
  usage,
  loading = false,
  onManageBilling,
}: BillingSettingsProps) => {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-[#F9FAFB] rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-lg font-bold text-[#111827]">
                {tierLabels[subscription.tier]} Plan
              </h4>
              <Badge variant={statusBadges[subscription.status] || 'neutral'} size="sm">
                {subscription.status}
              </Badge>
            </div>
            {subscription.status === 'trialing' && subscription.trialEnd && (
              <p className="text-sm text-[#6B7280]">
                Trial ends {formatDate(subscription.trialEnd, 'short')}
              </p>
            )}
            {subscription.status === 'active' && subscription.currentPeriodEnd && (
              <p className="text-sm text-[#6B7280]">
                Next billing date: {formatDate(subscription.currentPeriodEnd, 'short')}
              </p>
            )}
            {subscription.status === 'canceled' && subscription.cancelEffectiveAt && (
              <p className="text-sm text-[#6B7280]">
                Access until {formatDate(subscription.cancelEffectiveAt, 'short')}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/billing">
              <Button variant="outline" size="sm" icon={<FiExternalLink className="w-4 h-4" />}>
                Upgrade Plan
              </Button>
            </Link>
            {onManageBilling && subscription.status !== 'canceled' && (
              <Button variant="outline" size="sm" onClick={onManageBilling}>
                Manage Billing
              </Button>
            )}
          </div>
        </div>

        {subscription.status === 'past_due' && (
          <div className="p-3 bg-[#FEF3C7] border border-[#F59E0B]/20 rounded-xl flex items-center gap-2 text-[#92400E] text-xs mb-4">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            Your payment is past due. Please update your payment method to avoid service interruption.
          </div>
        )}
      </div>

      {/* Usage */}
      <div>
        <h4 className="text-sm font-semibold text-[#111827] mb-3">Current Usage</h4>
        <div className="space-y-4">
          <UsageMeter
            label="Scans"
            used={usage.scansUsed}
            limit={usage.scansLimit}
            unit=" scans"
          />
          <UsageMeter
            label="Emails Sent"
            used={usage.emailsUsed}
            limit={usage.emailsLimit}
            unit=" emails"
          />
          <UsageMeter
            label="Team Members"
            used={usage.teamUsed}
            limit={usage.teamLimit}
            unit=" members"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;