import { useState } from 'react';
import PlanCard from './PlanCard';
import CheckoutButton from './CheckoutButton';
import { useAuth } from '../../contexts/AuthContext';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    scansPerMonth: number | string;
    emailsPerMonth: number | string;
    followUpSteps: number | string;
    teamMembers: number;
    crmConnections: number | string;
    slackAlerts: boolean;
    apiAccess: boolean;
    whiteLabel: boolean;
  };
  highlighted?: boolean;
  current?: boolean;
}

const PricingPage = () => {
  const { user } = useAuth();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingInterval === 'monthly' ? 29 : 290,
      currency: 'USD',
      interval: billingInterval === 'monthly' ? 'month' : 'year',
      features: [
        'Up to 500 lead scans per month',
        '2 data sources (LinkedIn, Website)',
        'Basic AI lead scoring',
        '100 email outreaches per month',
        '1-step follow-up sequence',
        'Manual CRM export',
        'Community support',
      ],
      limits: {
        scansPerMonth: 500,
        emailsPerMonth: 100,
        followUpSteps: 1,
        teamMembers: 1,
        crmConnections: 0,
        slackAlerts: false,
        apiAccess: false,
        whiteLabel: false,
      },
      current: user?.subscription?.tier === 'starter',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingInterval === 'monthly' ? 79 : 790,
      currency: 'USD',
      interval: billingInterval === 'monthly' ? 'month' : 'year',
      features: [
        'Up to 2,500 lead scans per month',
        'All 5 data sources',
        'Advanced AI lead scoring',
        '1,000 email outreaches per month',
        '5-step follow-up sequences',
        '1 CRM auto-sync connection',
        'Slack notifications',
        '3 team members',
        'Email support',
      ],
      limits: {
        scansPerMonth: 2500,
        emailsPerMonth: 1000,
        followUpSteps: 5,
        teamMembers: 3,
        crmConnections: 1,
        slackAlerts: true,
        apiAccess: false,
        whiteLabel: false,
      },
      highlighted: true,
      current: user?.subscription?.tier === 'pro',
    },
    {
      id: 'scale',
      name: 'Scale',
      price: billingInterval === 'monthly' ? 199 : 1990,
      currency: 'USD',
      interval: billingInterval === 'monthly' ? 'month' : 'year',
      features: [
        'Up to 10,000 lead scans per month',
        'All sources + custom sources',
        'Priority AI scoring queue',
        '5,000 email outreaches per month',
        'Unlimited follow-up sequences',
        'Unlimited CRM connections',
        'Slack + custom channels',
        'Up to 10 team members',
        'API access & white label',
        'Dedicated Slack support + onboarding',
      ],
      limits: {
        scansPerMonth: 10000,
        emailsPerMonth: 5000,
        followUpSteps: 'Unlimited',
        teamMembers: 10,
        crmConnections: 'Unlimited',
        slackAlerts: true,
        apiAccess: true,
        whiteLabel: true,
      },
      current: user?.subscription?.tier === 'scale',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
            Choose Your Plan
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required. Upgrade or cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span
              className={`text-sm font-medium transition-colors ${
                billingInterval === 'monthly' ? 'text-[#111827]' : 'text-[#9CA3AF]'
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly')
              }
              className="relative w-12 h-6 bg-[#2563EB] rounded-full transition-colors"
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  billingInterval === 'yearly' ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${
                billingInterval === 'yearly' ? 'text-[#111827]' : 'text-[#9CA3AF]'
              }`}
            >
              Yearly
            </span>
            <span className="ml-2 px-2 py-0.5 bg-[#DCFCE7] text-[#22C55E] rounded-full text-xs font-bold">
              Save 17%
            </span>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              {plan.current ? (
                <button
                  disabled
                  className="w-full py-3 bg-[#F3F4F6] text-[#6B7280] rounded-xl font-semibold text-sm cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : (
                <CheckoutButton
                  priceId={`pri_${plan.id}_${billingInterval}`}
                  planName={plan.name}
                  amount={plan.price}
                  currency={plan.currency}
                  highlighted={plan.highlighted}
                />
              )}
            </PlanCard>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-16 sm:mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] text-center mb-10">
            Compare Features
          </h2>
          <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left p-4 sm:p-5 text-sm font-semibold text-[#111827]">Feature</th>
                    <th className="p-4 sm:p-5 text-center text-sm font-semibold text-[#111827]">Starter</th>
                    <th className="p-4 sm:p-5 text-center text-sm font-semibold text-[#111827] bg-[#EFF6FF]">Pro</th>
                    <th className="p-4 sm:p-5 text-center text-sm font-semibold text-[#111827]">Scale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {[
                    { label: 'Lead Scans / Month', starter: '500', pro: '2,500', scale: '10,000' },
                    { label: 'Data Sources', starter: '2', pro: '5', scale: 'All + Custom' },
                    { label: 'Emails / Month', starter: '100', pro: '1,000', scale: '5,000' },
                    { label: 'Follow-Up Steps', starter: '1', pro: '5', scale: 'Unlimited' },
                    { label: 'Team Members', starter: '1', pro: '3', scale: '10' },
                    { label: 'CRM Connections', starter: '-', pro: '1', scale: 'Unlimited' },
                    { label: 'Slack Alerts', starter: '-', pro: '✓', scale: '✓' },
                    { label: 'API Access', starter: '-', pro: '-', scale: '✓' },
                    { label: 'White Label', starter: '-', pro: '-', scale: '✓' },
                    { label: 'AI Scoring', starter: 'Basic', pro: 'Advanced', scale: 'Advanced' },
                    { label: 'Support', starter: 'Community', pro: 'Email', scale: 'Slack + Onboarding' },
                  ].map((row) => (
                    <tr key={row.label} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="p-4 sm:p-5 text-sm text-[#374151]">{row.label}</td>
                      <td className="p-4 sm:p-5 text-center text-sm text-[#6B7280]">{row.starter}</td>
                      <td className="p-4 sm:p-5 text-center text-sm text-[#2563EB] font-medium bg-[#EFF6FF]">{row.pro}</td>
                      <td className="p-4 sm:p-5 text-center text-sm text-[#6B7280]">{row.scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;