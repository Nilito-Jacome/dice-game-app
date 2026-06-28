import React, { useState, useEffect } from "react";

function App() {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const rollDice = async () => {
    const result = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
    await fetch("https://TU_BACKEND_URL/roll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result })
    });
    loadHistory();
  };

  const loadHistory = async () => {
    const res = await fetch("https://TU_BACKEND_URL/history");
    const data = await res.json();
    setHistory(data.map(r => r.result));

    const aiRes = await fetch("https://TU_AI_URL/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ results: data.map(r => r.result) })
    });
    const aiData = await aiRes.json();
    setPrediction(aiData.prediction);
  };

  useEffect(() => { loadHistory(); }, []);

  return (
    <div>
      <h1>Juego de Dados Online</h1>
      <button onClick={rollDice}>Lanzar Dados</button>
      <p>Historial: {history.join(", ")}</p>
      <p>Predicción próxima: {prediction}</p>
    </div>
  );
}

export default App;
