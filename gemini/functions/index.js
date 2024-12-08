/* 0. Initial */
// 0.1. Install dependencies
// 0.2. Fill out values in .env

const { onRequest } = require("firebase-functions/v2/https");
const line = require("./utils/line");
const gemini = require("./utils/gemini");

const NodeCache = require("node-cache");
const cache = new NodeCache();
const CACHE_CHAT = "chat_";

exports.webhook = onRequest(async (req, res) => {
  const events = req.body.events;
  for (const event of events) {
    const userId = event.source.userId;
    
    switch (event.type) {
      case "message":
        if (event.message.type === "text") {
          const prompt = event.message.text;
         
/* 1. Generate text from text-only input */
// 1.1. Send a prompt to Gemini
          // const text = await gemini.textOnly(prompt)
// 1.2. Reply a generated text
          // await line.reply(event.replyToken, [{type: 'text', text:text}])

/* 2. Build multi-turn conversations (chat) */
// 2.1. Get a cache chat history
          // let chatHistory = cache.get(CACHE_CHAT + userId)
// 2.2. Check available cache
          // if (!chatHistory) {
          //   chatHistory = []
          // }
// 2.3. Send a prompt to Gemini
          // const text = await gemini.chat(chatHistory, prompt)
// 2.4. Reply a generated text
          // await line.reply(event.replyToken, [{type: 'text', text: text}])
// 2.5. Push a new chat history
          // chatHistory.push({ role: 'user', parts: [{ text: prompt }] })
          // chatHistory.push({ role: 'model', parts: [{ text: text }] })
// 2.6. Set a cache chat history
          // cache.set(CACHE_CHAT + userId, chatHistory, 60)
          break;
        }
        break;
    }
  }
  res.end();
});
