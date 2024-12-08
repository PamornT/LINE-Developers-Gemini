const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const context = require("./context");

class Gemini {
  async textOnly(prompt) {
    // Note: From Nov 2024, the model has changed to gemini-1.5-flash-8b for mutimodal compatible
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async chat(cacheChatHistory, prompt) {
    // Note: From Nov 2024, the model has changed to gemini-1.5-flash-8b for mutimodal compatible
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    const chatHistory = [
      {
        role: "user",
        parts: [{ text: "ตอบคำถามเฉพาะที่เกี่ยวกับ กิจกรรมในมหาวิทยาลัยกรุงเทพ ตอบเฉพาะคำถามใน Text เท่านั้น\n คำถาม:" + prompt + "\n  Text:" + JSON.stringify(context.bu_json) }]
      },
      {
        role: "model",
        parts: [{ text: "สวัสดีครับ ผมเป็นฝ่ายทะเบียนของ มหาวิทยาลัยกรุงเทพ ครับ" }]
      }
    ];
    if (cacheChatHistory.length > 0) {
      chatHistory.push(...cacheChatHistory);
    }
    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }
}

module.exports = new Gemini();
