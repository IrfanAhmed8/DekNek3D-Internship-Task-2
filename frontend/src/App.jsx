import { useState } from "react";
import { motion } from "framer-motion";
import TextToImageAnimation from "./TextToImageAnimation";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImage("");

    const response = await fetch("http://localhost:5000/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setImage(data.image);
    setLoading(false);
  };

  const downloadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-image.png";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #111 0%, #000 60%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
      }}
    >
      <TextToImageAnimation />

      <h1 style={{ marginTop: "40px" }}>
        Text to <span style={{ color: "#9EFF00" }}>Image</span> Generator
      </h1>

      {/* Input + Button */}
      <div style={{ display: "flex", gap: "12px", marginTop: "30px" }}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your imagination..."
          style={{
            width: "360px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #333",
            background: "#0f0f0f",
            color: "#fff",
          }}
        />

        <button
          onClick={generateImage}
          style={{
            padding: "14px 24px",
            borderRadius: "10px",
            border: "none",
            background: "#9EFF00",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Generate
        </button>
      </div>

      {loading && (
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ marginTop: "20px", color: "#9EFF00" }}
        >
          Generating image...
        </motion.p>
      )}

      {image && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: "40px", textAlign: "center" }}
        >
          <img
            src={image}
            alt="Generated"
            style={{
              width: "420px",
              borderRadius: "16px",
              boxShadow: "0 0 40px rgba(158,255,0,0.2)",
            }}
          />

          <div>
            <button
              onClick={downloadImage}
              style={{
                marginTop: "16px",
                padding: "12px 24px",
                background: "transparent",
                color: "#9EFF00",
                border: "1px solid #9EFF00",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Download Image
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
