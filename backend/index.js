const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const RollSchema = new mongoose.Schema({ result: Number, date: Date });
const Roll = mongoose.model("Roll", RollSchema);

// Guardar lanzamiento
app.post("/roll", async (req, res) => {
  const roll = new Roll({ result: req.body.result, date: new Date() });
  await roll.save();
  res.json({ success: true });
});

// Obtener historial
app.get("/history", async (req, res) => {
  const rolls = await Roll.find();
  res.json(rolls);
});

app.listen(4000, () => console.log("Backend running on port 4000"));
