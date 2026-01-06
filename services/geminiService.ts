
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePrivacyPolicy(company: string, website: string) {
  const prompt = `Generate a modern, professional, and compliant Privacy Policy for a company named "${company}" with the website "${website}". This company uses Phone.email for phone number verification. The policy should specifically mention how phone numbers are handled via third-party verification and comply with standard GDPR/CCPA guidelines. Format the response as a clean Markdown string.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
      topP: 0.95,
    },
  });

  return response.text;
}

export async function getSecurityInsights(url: string) {
  const prompt = `A user has just verified their phone number via a service that returns this JSON endpoint: ${url}. Explain to a non-technical user why this is more secure than traditional password-based authentication or email verification. Mention "OTP-less" benefits and data integrity. Keep it concise and professional.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    },
  });

  return response.text;
}
