import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(40),
});

const SYSTEM_PROMPT = `You are MedAI, a cautious AI healthcare assistant. You are NOT a doctor and you NEVER provide a definitive diagnosis. Your job is to listen, ask brief clarifying questions when needed, and produce structured, safe guidance.

CRITICAL SAFETY RULES:
- Never replace a doctor. Always recommend professional consultation when relevant.
- Detect emergencies (chest pain with radiation, stroke signs FAST, severe bleeding, anaphylaxis, suicidal intent, severe difficulty breathing, sudden severe headache, etc.) and clearly tell the user to call emergency services immediately.
- Never invent specific drug doses. Only mention common safe OTC options at standard adult dosing if clearly appropriate; otherwise advise consulting a pharmacist.
- Always include a disclaimer.

You MUST always respond by calling the "medical_response" tool with the structured schema. Do not return free text.

Severity guide: low | medium | high | emergency.
Confidence is your overall confidence in the structured assessment, 0-100.`;

export const generateMedicalResponse = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const tools = [
      {
        type: "function",
        function: {
          name: "medical_response",
          description:
            "Return a structured cautious medical assistant response.",
          parameters: {
            type: "object",
            properties: {
              summary: {
                type: "string",
                description: "Short empathetic summary of what the user described.",
              },
              possible_conditions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    likelihood: {
                      type: "string",
                      enum: ["low", "moderate", "high"],
                    },
                    note: { type: "string" },
                  },
                  required: ["name", "likelihood", "note"],
                  additionalProperties: false,
                },
              },
              confidence: {
                type: "number",
                minimum: 0,
                maximum: 100,
              },
              severity: {
                type: "string",
                enum: ["low", "medium", "high", "emergency"],
              },
              precautions: { type: "array", items: { type: "string" } },
              otc_suggestions: { type: "array", items: { type: "string" } },
              lifestyle: { type: "array", items: { type: "string" } },
              consult_doctor: {
                type: "string",
                description:
                  "Concrete advice on whether and which kind of doctor to consult.",
              },
              emergency_warning: {
                type: "string",
                description:
                  "If severity is emergency, explicit instruction to seek emergency care. Otherwise empty string.",
              },
              follow_up_question: {
                type: "string",
                description:
                  "Optional single follow up question to clarify, or empty string.",
              },
              disclaimer: { type: "string" },
            },
            required: [
              "summary",
              "possible_conditions",
              "confidence",
              "severity",
              "precautions",
              "otc_suggestions",
              "lifestyle",
              "consult_doctor",
              "emergency_warning",
              "follow_up_question",
              "disclaimer",
            ],
            additionalProperties: false,
          },
        },
      },
    ];

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...data.messages,
          ],
          tools,
          tool_choice: {
            type: "function",
            function: { name: "medical_response" },
          },
        }),
      },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      if (response.status === 429) {
        return {
          error: "Rate limit reached. Please wait a moment and try again.",
        } as const;
      }
      if (response.status === 402) {
        return {
          error:
            "AI credits exhausted. Add credits in Lovable workspace settings.",
        } as const;
      }
      console.error("AI gateway error", response.status, text);
      return { error: "MedAI is temporarily unavailable. Please try again." } as const;
    }

    const json = await response.json();
    const toolCall = json?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      return { error: "MedAI could not produce a structured response." } as const;
    }

    try {
      const parsed = JSON.parse(toolCall.function.arguments);
      return { data: parsed } as const;
    } catch (e) {
      console.error("Failed to parse tool args", e);
      return { error: "MedAI returned an invalid response. Please retry." } as const;
    }
  });
