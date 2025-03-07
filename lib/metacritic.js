// lib/metacritic.js
export async function getLatestGames() {
  // Usamos 10.0.2.2 en el emulador Android para apuntar a nuestro servidor
  const LATEST_GAMES = "http://10.0.2.2:3000/api/metacritic/latest-games";

  const rawData = await fetch(LATEST_GAMES);
  const data = await rawData.json(); // data es un arreglo

  return data.map((item) => {
    const {
      title,
      description,
      platform,
      thumbnailUrl,
      metaScore,
      releaseDate,
    } = item;

    return {
      title,
      description,
      platform,
      score: metaScore,
      image: thumbnailUrl, // la URL de la imagen ya viene completa
      releaseDate,
    };
  });
}

export async function getGameDetails(slug) {
  // Si tienes un endpoint para game-details, cambia la URL de acuerdo a eso.
  const GAME_DETAILS = `http://10.0.2.2:3000/api/metacritic/game-details/${slug}`;

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  // Aquí deberás adaptar el mapeo según la estructura de la respuesta de game-details.
  // Por ejemplo, si json viene como un arreglo o con otra estructura.
  // Este ejemplo asume que json es un objeto con la propiedad "components":
  const { components } = json;
  const { title, description, criticScoreSummary, images } = components[0];
  const { score } = criticScoreSummary;

  // Obtener la imagen tipo "cardImage"
  const cardImage = images.find((image) => image.typeName === "cardImage");
  const { bucketType, bucketPath } = cardImage;
  const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

  const rawReviews = components[3].data.items;

  const reviews = rawReviews.map((review) => {
    const { quote, score, date, publicationName, author } = review;
    return { quote, score, date, publicationName, author };
  });

  return {
    img,
    title,
    slug,
    description,
    score,
    reviews,
  };
}
