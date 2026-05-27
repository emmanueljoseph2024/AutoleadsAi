// src/types/message.ts

export type MessagePlatform = 'linkedin' | 'facebook' | 'twitter' | 'instagram' | 'email';

export type MessageTone = 'professional' | 'friendly' | 'casual' | 'formal' | 'direct';

export interface MessageTemplate {
  _id: string;
  userId: string;
  leadId?: string;
  leadName?: string;
  platform: MessagePlatform;
  type: 'initial_contact' | 'follow_up' | 'value_pitch' | 'objection_response' | 'closing';
  body: string;
  tone: MessageTone;
  subject?: string;
  keyValueProps: string[];
  personalizationHints: string[];
  generatedBy: string;
  isUsed: boolean;
  userRating?: number;
  createdAt: string;
}