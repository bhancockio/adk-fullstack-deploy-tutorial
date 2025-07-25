/**
 * Shared types for SSE streaming utilities
 * These types are used across parser, processor, and connection utilities
 */

import { Message } from "@/types";
import { ProcessedEvent } from "@/components/ActivityTimeline";

/**
 * Parsed SSE data structure returned by the parser
 */
export interface ParsedSSEData {
  textParts: string[];
  thoughtParts: string[];
  agent: string;
  finalReportWithCitations?: boolean;
  functionCall?: {
    name: string;
    args: Record<string, unknown>;
    id: string;
  };
  functionResponse?: {
    name: string;
    response: Record<string, unknown>;
    id: string;
  };
  sourceCount: number;
  sources?: Record<string, { title: string; url: string }>;
}

/**
 * Raw SSE parsed JSON structure from the backend
 */
export interface RawSSEData {
  content?: {
    parts?: Array<{
      text?: string;
      thought?: boolean;
      functionCall?: {
        name: string;
        args: Record<string, unknown>;
        id: string;
      };
      functionResponse?: {
        name: string;
        response: Record<string, unknown>;
        id: string;
      };
    }>;
  };
  author?: string;
  actions?: {
    stateDelta?: {
      final_report_with_citations?: boolean;
      url_to_short_id?: Record<string, string>;
      sources?: Record<string, { title: string; url: string }>;
    };
  };
}

/**
 * SSE connection state
 */
export type SSEConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "error"
  | "closed";

/**
 * SSE event types for processing
 */
export type SSEEventType = "data" | "comment" | "empty" | "unknown";

/**
 * Processed SSE line structure
 */
export interface ProcessedSSELine {
  type: SSEEventType;
  content: string;
}

/**
 * Stream processing callbacks interface
 */
export interface StreamProcessingCallbacks {
  onMessageUpdate: (message: Message) => void;
  onEventUpdate: (messageId: string, event: ProcessedEvent) => void;
  onWebsiteCountUpdate: (count: number) => void;
}

/**
 * API payload structure for streaming requests
 */
export interface StreamingAPIPayload {
  message: string;
  userId: string;
  sessionId: string;
}

/**
 * Connection manager options
 */
export interface ConnectionManagerOptions {
  retryFn?: <T>(fn: () => Promise<T>) => Promise<T>;
  endpoint?: string;
}
