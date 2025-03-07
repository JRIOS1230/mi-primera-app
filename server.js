// server.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // Si usas Node >= 18, fetch ya está incluido

const app = express();
const PORT = 3000;

// Permite CORS desde cualquier origen (para desarrollo)
app.use(cors());

// Endpoint para obtener los juegos "latest-games"
app.get("/api/metacritic/latest-games", async (req, res) => {
  try {
    const url =
      "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";
    const response = await fetch(url);
    const data = await response.json();
    // Devolvemos la respuesta tal cual
    res.json(data);
  } catch (error) {
    console.error("Error en /api/metacritic/latest-games:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint para obtener detalles de un juego
app.get("/api/metacritic/game-details/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const url = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error en /api/metacritic/game-details:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});