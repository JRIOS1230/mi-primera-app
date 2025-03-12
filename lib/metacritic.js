// lib/metacritic.js
import fetch from "cross-fetch";

// Configuración común para las peticiones a TMDB
const TMDB_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjczNjkxNWE4YzJjMTgzNTZlMTdlOTRhNzhlYWI0YSIsIm5iZiI6MTcxOTc5NjU0NC4xOTcsInN1YiI6IjY2ODIwMzQwNTcxOWU3MTBlZTVjODJiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nPhU6K6KYHve4mJF-nXceGXsU54AMd_h3yrhCq5H3ug";

const TMDB_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TMDB_TOKEN,
  },
};

// Función para obtener la lista de "juegos" (ahora películas)
export async function getLatestGames() {
  // Endpoint de TMDB para cambios en películas
  const CHANGES_URL = "https://api.themoviedb.org/3/movie/changes?page=1";

  const rawData = await fetch(CHANGES_URL, TMDB_OPTIONS);
  const data = await rawData.json();
  // data.results es un arreglo de objetos con { id, adult }

  // Para cada id, se obtiene la información completa
  const movies = await Promise.all(
    data.results.map(async (item) => {
      const detailsUrl = `https://api.themoviedb.org/3/movie/${item.id}?language=en-US`;
      const detailsResponse = await fetch(detailsUrl, TMDB_OPTIONS);
      const details = await detailsResponse.json();

      return {
        title: details.title,
        description: details.overview,
        // Usamos original_language como proxy para "platform"
        platform: details.original_language,
        score: details.vote_average,
        // Se construye la URL completa para la imagen si existe
        image: details.poster_path
          ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
          : null,
        releaseDate: details.release_date,
        id: details.id,
      };
    })
  );
  return movies;
}

// Función para obtener detalles de un juego (película) a partir de su "slug" (id)
export async function getGameDetails(slug) {
  // Endpoint de detalles de TMDB
  const DETAILS_URL = `https://api.themoviedb.org/3/movie/${slug}?language=en-US`;

  const rawData = await fetch(DETAILS_URL, TMDB_OPTIONS);
  const details = await rawData.json();

  // Construir la URL completa para la imagen
  const img = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : null;

  // Para los reviews, se llama al endpoint de reviews de TMDB
  const REVIEWS_URL = `https://api.themoviedb.org/3/movie/${slug}/reviews?language=en-US&page=1`;
  const reviewsResponse = await fetch(REVIEWS_URL, TMDB_OPTIONS);
  const reviewsData = await reviewsResponse.json();

  // Mapear cada review a un objeto similar al que manejas actualmente
  const reviews = (reviewsData.results || []).map((review) => {
    return {
      quote: review.content,
      // Usamos rating del autor_details si existe; de lo contrario, dejamos null
      score: review.author_details ? review.author_details.rating : null,
      date: review.created_at,
      publicationName: review.author, // No hay un "publication" en TMDB; se usa el autor
      author: review.author,
    };
  });

  return {
    img,
    title: details.title,
    slug, // se conserva el id como slug
    description: details.overview,
    score: details.vote_average,
    releaseDate: details.release_date,
    runtime: details.runtime,
    genres: details.genres, // arreglo de objetos {id, name}
    tagline: details.tagline,
    reviews,
  };
}
