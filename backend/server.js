require("dotenv").config();
const express= require("express");
const cors= require("cors");
const OpenAi=require("openai")

const app= express();
app.use(cors());
app.use(express.json());


const client= new OpenAi({
    baseURL: 'https://api.tokenfactory.nebius.com/v1/',
    apiKey: process.env.NEBIUS_API_KEY,
});

app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await client.images.generate({
      model: "black-forest-labs/flux-schnell",
      prompt: prompt,
    });

    res.json({
      image: response.data[0].url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Image generation failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
