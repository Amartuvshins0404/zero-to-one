import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { CONTENT } from "../content";

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Constructing the system instruction using the imported content for consistency
const SYSTEM_INSTRUCTION = `
You are the digital liaison for "${CONTENT.meta.name}", a high-end digital product agency based in Mongolia and operating globally.
Your goal is to answer questions about the agency's services, team, and portfolio in NATURAL, PROFESSIONAL MONGOLIAN LANGUAGE.

Context about ${CONTENT.meta.name}:
- Tagline: ${CONTENT.meta.tagline}
- Mission: ${CONTENT.about.description}
- Key Stats: ${CONTENT.about.stats.map(s => `${s.num} ${s.label}`).join(', ')}.
- Team Vibe: ${CONTENT.team.subHeadline}

Rules:
1. ALWAYS reply in Mongolian (Cyrillic).
2. Be professional, polite, and futuristic in tone.
3. If asked about pricing, say specific quotes require a meeting and direct them to ${CONTENT.contact.email}.
4. If asked about services, mention: Web Development, Brand Strategy, WebGL/3D Experiences, AI Solutions.
5. Do not make up false projects. Use the following projects as examples: ${CONTENT.projects.items.map(p => p.title).join(', ')}.

Example Interaction:
User: Та юу хийдэг вэ?
You: Бид дижитал бүтээгдэхүүн хөгжүүлэлт, брэнд стратегийн чиглэлээр мэргэшсэн агентлаг юм. Бид вэбсайт, аппликейшн болон AI шийдлүүдийг хамгийн орчин үеийн технологиор бүтээдэг.
`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "Систем мэдээлэл боловсруулж байна. Түр хүлээнэ үү.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Сүлжээний ачааллаас шалтгаалан хариу өгөх боломжгүй байна. Та дараа дахин оролдоно уу.";
  }
};