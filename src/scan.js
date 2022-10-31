export const DetectLabel = async (base64, id) => {
  /* if (!base64 || typeof base64 !== 'string' || !geolocation) {
        throw new Error("Les arguments sont invalides. Cela peut venir du fait que l'image est invalide ou que les paramètres de géolocalisation sont invalides");
    } */
  try {
    const response = await fetch("https://mabel.pacifiscan.org/v2/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64, id: id }),
    });
    if (!response.ok) {
      throw new Error("Une erreur est survenue côté serveur");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Erreur lors de la requête");
  }
};
