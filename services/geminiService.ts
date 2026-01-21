
import { GoogleGenAI, Type } from "@google/genai";
import { SkillCategory, Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateLesson = async (topic: string, category: SkillCategory, difficulty: Difficulty) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a comprehensive lesson about ${topic} for ${difficulty} level in the ${category} category. Include a quiz with 3 multiple choice questions.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.INTEGER }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const getTutorAnswer = async (question: string, context: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an AI tutor. Answer the student's question based on the following context: "${context}". Question: "${question}"`,
  });

  return response.text;
};
