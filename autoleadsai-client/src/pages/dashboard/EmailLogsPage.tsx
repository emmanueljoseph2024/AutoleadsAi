// src/pages/dashboard/EmailLogsPage.tsx

import EmailLogTable from '../../components/email/EmailLogTable';

const EmailLogsPage = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Email Logs</h1>
        <p className="text-sm text-[#6B7280]">Outreach email performance</p>
      </div>
      <EmailLogTable />
    </div>
  );
};

export default EmailLogsPage;