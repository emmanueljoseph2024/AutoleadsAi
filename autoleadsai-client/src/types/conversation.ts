// src/types/conversation.ts

export type ConversationStatus = 'active' | 'waiting' | 'human_needed' | 'closed' | 'spam';

export interface ConversationMessage {
  _id?: string;
  direction: 'inbound' | 'outbound';
  content: string;
  senderName?: string;
  senderId?: string;
  platformMessageId?: string;
  aiGenerated: boolean;
  confidence?: number;
  sentAt?: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  userId: string;
  leadId?: string;
  leadName?: string;
  leadEmail?: string;
  platform: string;
  platformConversationId: string;
  status: ConversationStatus;
  messages: ConversationMessage[];
  aiEscalated: boolean;
  aiEscalationReason?: string;
  tags: string[];
  sentiment: 'positive' | 'neutral' | 'negative' | 'unknown';
  intent: 'question' | 'interest' | 'complaint' | 'spam' | 'other' | 'unknown';
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}