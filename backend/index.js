const express = require("express");
const cors = require("cors");
const { OpenAIApi } = require("@openai/openai-node");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAIApi({
  key: "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", // api key
});

app.post("/api/generate-subtitles", async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `Translate the following English text to hindi:\n"${text}"\nTranslation:`;

    const response = await openai.completions.create({
      model: "whisper-large",
      prompt,
    });

    const subtitles = response.choices[0].text;

    res.json({ subtitles });
  } catch (error) {
    console.error("Error generating subtitles:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
