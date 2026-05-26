// src/pages/dashboard/ConversationsPage.tsx

import { useParams } from 'react-router-dom';
import ConversationList from '../../components/conversations/ConversationList';
import ConversationThread from '../../components/conversations/ConversationThread';

const ConversationsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Conversations</h1>
        <p className="text-sm text-[#6B7280]">Real-time chat with leads</p>
      </div>

      {id ? <ConversationThread conversationId={id} /> : <ConversationList />}
    </div>
  );
};

export default ConversationsPage;