import {
  getEndpointForPath,
  getAuthHeaders,
  shouldUseAgentEngine,
} from "@/lib/config";

/**
 * Session creation result with success status and session details
 */
export interface SessionCreationResult {
  success: boolean;
  sessionId: string;
  created: boolean;
  error?: string;
  deploymentType?: string;
}

/**
 * Abstract base class for session management services
 */
export abstract class SessionService {
  abstract createSession(
    userId: string,
    sessionId: string
  ): Promise<SessionCreationResult>;
}

/**
 * Agent Engine session service implementation
 * Handles session creation using Agent Engine's API
 */
export class AgentEngineSessionService extends SessionService {
  async createSession(
    userId: string,
    sessionId: string
  ): Promise<SessionCreationResult> {
    const sessionEndpoint = getEndpointForPath("", "query");

    const createSessionPayload = {
      class_method: "create_session",
      input: {
        user_id: userId,
      },
    };

    try {
      const authHeaders = await getAuthHeaders();
      const createSessionResponse = await fetch(sessionEndpoint, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createSessionPayload),
      });

      if (createSessionResponse.ok) {
        const sessionData = await createSessionResponse.json();
        const actualSessionId = sessionData.output?.id;
        if (actualSessionId) {
          return {
            success: true,
            sessionId: actualSessionId,
            created: true,
            deploymentType: "agent_engine",
          };
        }
      }

      console.warn(
        "Agent Engine session creation failed, using provided sessionId"
      );
      return {
        success: false,
        sessionId,
        created: false,
        error: "Agent Engine session creation failed",
        deploymentType: "agent_engine",
      };
    } catch (sessionError) {
      console.warn("Agent Engine session creation error:", sessionError);
      return {
        success: false,
        sessionId,
        created: false,
        error: `Agent Engine session creation error: ${
          sessionError instanceof Error
            ? sessionError.message
            : String(sessionError)
        }`,
        deploymentType: "agent_engine",
      };
    }
  }
}

/**
 * Local Backend session service implementation
 * Handles session creation using local backend API
 */
export class LocalBackendSessionService extends SessionService {
  async createSession(
    userId: string,
    sessionId: string
  ): Promise<SessionCreationResult> {
    const sessionEndpoint = getEndpointForPath(
      `/apps/app/users/${userId}/sessions/${sessionId}`
    );

    try {
      const sessionAuthHeaders = await getAuthHeaders();
      const sessionResponse = await fetch(sessionEndpoint, {
        method: "POST",
        headers: {
          ...sessionAuthHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const success = sessionResponse.ok || sessionResponse.status === 409;

      if (!success) {
        const errorText = await sessionResponse.text();
        console.error(
          "Local backend session creation failed:",
          sessionResponse.status,
          errorText
        );
        return {
          success: false,
          sessionId,
          created: false,
          error: `Local backend session creation failed: ${sessionResponse.status} ${errorText}`,
          deploymentType: "local_backend",
        };
      } else {
        console.log("Local backend session created/verified successfully");
        return {
          success: true,
          sessionId,
          created: success,
          deploymentType: "local_backend",
        };
      }
    } catch (sessionError) {
      console.error("Local backend session creation error:", sessionError);
      return {
        success: false,
        sessionId,
        created: false,
        error: `Local backend session creation error: ${
          sessionError instanceof Error
            ? sessionError.message
            : String(sessionError)
        }`,
        deploymentType: "local_backend",
      };
    }
  }
}

/**
 * Factory function to get the appropriate session service based on deployment configuration
 */
export function getSessionService(): SessionService {
  if (shouldUseAgentEngine()) {
    return new AgentEngineSessionService();
  } else {
    return new LocalBackendSessionService();
  }
}

/**
 * Convenience function to create a session using the appropriate service
 * This function determines the deployment strategy and delegates to the correct service
 */
export async function createSessionWithService(
  userId: string,
  sessionId: string
): Promise<SessionCreationResult> {
  const service = getSessionService();
  return await service.createSession(userId, sessionId);
}
