// server.js
import express from "express";
import cors from "cors";
import { getLatestGames, getGameDetails } from "./lib/metacritic.js";

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint para obtener la lista de "juegos" (ahora películas)
app.get("/api/metacritic/latest-games", async (req, res) => {
  try {
    const data = await getLatestGames();
    res.json(data);
  } catch (error) {
    console.error("Error en /api/metacritic/latest-games:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint para obtener detalles de un juego (película) a partir de su "slug" (id)
app.get("/api/metacritic/game-details/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await getGameDetails(slug);
    res.json(data);
  } catch (error) {
    console.error("Error en /api/metacritic/game-details:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
