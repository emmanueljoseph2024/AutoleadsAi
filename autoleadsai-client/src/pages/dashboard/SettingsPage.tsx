// src/pages/dashboard/SettingsPage.tsx

import { useState } from 'react';
import { FiUser, FiUsers, FiCreditCard, FiKey, FiBell, FiCpu } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import ProfileSettings from '../../components/settings/ProfileSettings';
import TeamSettings from '../../components/settings/TeamSettings';
import BillingSettings from '../../components/settings/BillingSettings';
import ApiKeySettings from '../../components/settings/ApiKeySettings';
import SlackSettings from '../../components/settings/SlackSettings';
import CrmSettings from '../../components/settings/CrmSettings';
import AiAgentSettings from '../../components/settings/AiAgentSettings';
import NotificationSettings from '../../components/settings/NotificationSettings';

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <FiUser className="w-4 h-4" /> },
    { key: 'team', label: 'Team', icon: <FiUsers className="w-4 h-4" /> },
    { key: 'billing', label: 'Billing', icon: <FiCreditCard className="w-4 h-4" /> },
    { key: 'api-keys', label: 'API Keys', icon: <FiKey className="w-4 h-4" /> },
    { key: 'slack', label: 'Slack', icon: <FiBell className="w-4 h-4" /> },
    { key: 'crm', label: 'CRM', icon: <FiCreditCard className="w-4 h-4" /> },
    { key: 'ai-agent', label: 'AI Agent', icon: <FiCpu className="w-4 h-4" /> },
    { key: 'notifications', label: 'Notifications', icon: <FiBell className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div><h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Settings</h1></div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-48 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'}`}
              >
                {tab.icon}{tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
          {activeTab === 'profile' && user && (
            <ProfileSettings
              user={{
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar ?? undefined,
              }}
            />
          )}
          {activeTab === 'team' && <TeamSettings members={[]} invites={[]} maxMembers={3} />}
          {activeTab === 'billing' && user?.subscription && (
            <BillingSettings
              subscription={user.subscription as any}
              usage={{ scansUsed: 0, scansLimit: 500, emailsUsed: 0, emailsLimit: 100, teamUsed: 1, teamLimit: 1 }}
            />
          )}
          {activeTab === 'api-keys' && <ApiKeySettings apiKeys={[]} />}
          {activeTab === 'slack' && <SlackSettings integration={null} />}
          {activeTab === 'crm' && <CrmSettings integration={null} />}
          {activeTab === 'ai-agent' && <AiAgentSettings config={null} />}
          {activeTab === 'notifications' && <NotificationSettings preferences={null} />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;