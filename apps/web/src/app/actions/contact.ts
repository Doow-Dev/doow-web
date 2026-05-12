"use server";

const CRISP_BASE_URL = "https://api.crisp.chat/v1";

function getCrispAuth(): string {
  const identifier = process.env.CRISP_API_IDENTIFIER;
  const key = process.env.CRISP_API_KEY;

  if (!identifier || !key) {
    throw new Error("Crisp API credentials are not configured");
  }

  return Buffer.from(`${identifier}:${key}`).toString("base64");
}

function getCrispHeaders(): HeadersInit {
  return {
    Authorization: `Basic ${getCrispAuth()}`,
    "Content-Type": "application/json",
    "X-Crisp-Tier": "plugin",
  };
}

function getWebsiteId(): string {
  const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
  if (!websiteId) {
    throw new Error("Crisp website ID is not configured");
  }
  return websiteId;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export async function submitContactForm(
  data: ContactFormData,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const websiteId = getWebsiteId();
    const headers = getCrispHeaders();

    // Step 1: Create conversation
    const conversationResponse = await fetch(
      `${CRISP_BASE_URL}/website/${websiteId}/conversation`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({}),
      },
    );

    if (!conversationResponse.ok) {
      return {
        ok: false,
        error: `Failed to create conversation: ${conversationResponse.status}`,
      };
    }

    const conversationBody = (await conversationResponse.json()) as {
      data?: { session_id?: string };
    };
    const sessionId = conversationBody.data?.session_id;

    if (!sessionId) {
      return { ok: false, error: "No session ID returned from Crisp" };
    }

    // Step 2: Send message with contact details embedded
    const messageResponse = await fetch(
      `${CRISP_BASE_URL}/website/${websiteId}/conversation/${sessionId}/message`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          type: "text",
          from: "user",
          origin: "chat",
          content: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\n\n${data.message}`,
        }),
      },
    );

    if (!messageResponse.ok) {
      return {
        ok: false,
        error: `Failed to send message: ${messageResponse.status}`,
      };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return { ok: false, error: message };
  }
}
