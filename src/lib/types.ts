// Shared types for the Jellymove application

export interface Suggestion {
  title: string;
  description: string;
  icon: string;
  action: string;
}

export interface AuditResponse {
  suggestions: Suggestion[];
  score: number;
  verdict: string;
}

export interface AuditRequest {
  domain: string;
  description: string;
}

export interface EmailCaptureRequest {
  email: string;
  domain: string;
  score: number;
  type: 'application' | 'waitlist';
  suggestions: Suggestion[];
  verdict: string;
}

export type EmailStatus = 'idle' | 'sending' | 'success' | 'error';

export interface JellyTier {
  range: [number, number];
  emoji: string;
  label: string;
  statusDescription: string;
}
