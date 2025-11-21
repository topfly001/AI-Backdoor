import { GoogleGenAI } from "@google/genai";

// Declare process for TypeScript to understand global process variable injected by Vite
declare const process: {
  env: {
    API_KEY?: string;
  }
};

// Initialize Gemini Client lazily or safely to prevent white screen of death
// if the API key is missing during initial bundle load.
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing. Chat functionality will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
你是一位世界级的AI安全科普专家。你的任务是用最通俗易懂、充满趣味的比喻（比如“给AI戴墨镜”、“训练狗狗”）来向普通用户解释复杂的“AI后门攻击”（Backdoor Attack）概念。
请遵循以下规则：
1. 严禁使用晦涩的数学公式和过度学术的术语（如“梯度下降”、“损失函数”等），除非你紧接着用比喻解释了它。
2. 语气要轻松、幽默，像是在和朋友聊天。
3. 核心解释逻辑：
   - 正常训练：像教小孩看图识字。
   - 投毒（Poisoning）：坏人在教材里动了手脚（比如把贴了贴纸的“停止”牌标记为“限速”）。
   - 潜伏期：AI平时表现完全正常，没人发现。
   - 触发（Trigger）：一旦坏人拿出那个贴纸，AI就会立刻变傻，执行坏人的指令。
4. 回答要简洁有力，不要长篇大论。
`;

export const askGemini = async (question: string): Promise<string> => {
  try {
    const ai = getAiClient();
    if (!ai) {
      return "系统配置错误：未检测到 API Key。请检查 Cloudflare 环境变量设置。";
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: question,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "抱歉，我的信号好像被干扰了，请再说一遍？";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "系统繁忙，或者是防御系统拦截了我的信号...请稍后再试。";
  }
};