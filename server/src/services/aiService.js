const {GoogleGenAI} = require("@google/genai")
require("dotenv").config();
const ai = new GoogleGenAI({})

const generateResponse = async (prompt) =>{
    const response = await ai.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents: content
    })
 for await (const chunk of response) {
    console.log(chunk.text)
  }
}
module.exports = {
    generateResponse
}