// src/components/email/NurtureSequenceList.tsx

import { FiMail } from 'react-icons/fi';
import EmptyState from '../common/EmptyState';
import NurtureSequenceCard from './NurtureSequenceCard';
import Skeleton from '../common/Skeleton';

interface NurtureStep {
  stepNumber: number;
  delayDays: number;
  emailSubject: string;
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'replied' | 'bounced';
  sentAt?: string;
  aiGenerated: boolean;
}

interface NurtureSequence {
  _id: string;
  leadId: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'active' | 'paused' | 'conversation' | 'converted' | 'closed_lost' | 'closed_spam' | 'unsubscribed';
  currentStep: number;
  maxSteps: number;
  steps: NurtureStep[];
  conversionProbability: number;
  startedAt: string;
}

interface NurtureSequenceListProps {
  sequences: NurtureSequence[];
  loading?: boolean;
}

const NurtureSequenceList = ({ sequences, loading = false }: NurtureSequenceListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-1.5 w-full rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sequences.length === 0) {
    return (
      <EmptyState
        icon={<FiMail className="w-8 h-8" />}
        title="No nurture sequences"
        description="Nurture sequences will appear here when hot leads are being automatically followed up."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sequences.map((sequence) => (
        <NurtureSequenceCard key={sequence._id} sequence={sequence} />
      ))}
    </div>
  );
};

export default NurtureSequenceList;