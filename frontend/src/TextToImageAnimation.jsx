import { motion } from "framer-motion";

export default function TextToImageAnimation() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          padding: "20px 30px",
          background: "#1a1a1a",
          borderRadius: "12px",
          color: "#9EFF00",
          fontWeight: "bold",
        }}
      >
        TEXT
      </motion.div>

      <motion.div
        animate={{ x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        style={{ color: "#9EFF00", fontSize: "24px" }}
      >
        ➜
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          padding: "20px 30px",
          background: "#9EFF00",
          borderRadius: "12px",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        IMAGE
      </motion.div>
    </div>
  );
}
