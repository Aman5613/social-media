const { GoogleGenAI } = require("@google/genai");
const API_KEY = process.env.GEMINI_API_KEY;

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

const genarateCaption = async (file) => {
  try {
    // ✅ Convert multer buffer to base64
    const base64ImageData = file.buffer.toString("base64");

    // console.log(base64ImageData);
    

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageData,
          },
        },
        { text: "generate a caption of this image for linkedin post, don't give option, give only one" },
      ],
    });
    // console.log(result.text);
    return result.text
  } catch (err) {
    console.error("Error generating caption:", err);
    return "unable to generate the caption - image type may be diff from jpeg"
  }
};

module.exports = genarateCaption;
