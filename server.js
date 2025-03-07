// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint para obtener los juegos "latest-games"
app.get("/api/metacritic/latest-games", async (req, res) => {
  try {
    const url = "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";
    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; MiApp/1.0; +http://tudominio.com)"
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en respuesta:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error en /api/metacritic/latest-games:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Puedes agregar aquí el endpoint para detalles si es necesario
app.get("/api/metacritic/game-details/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const url = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;
    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; MiApp/1.0; +http://tudominio.com)"
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en respuesta:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error en /api/metacritic/game-details:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
