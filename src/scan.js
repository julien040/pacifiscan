export const DetectLabel = async (base64, geolocation) => {
    console.log(typeof base64);
    console.log(!base64);
    console.log(!geolocation);
    /* if (!base64 || typeof base64 !== 'string' || !geolocation) {
        throw new Error("Les arguments sont invalides. Cela peut venir du fait que l'image est invalide ou que les paramètres de géolocalisation sont invalides");
    } */
    const response= await fetch('https://api.pacifiscan.nsi-anova.ml', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({image:base64, geo:geolocation}),
    }).catch(err => {
        console.log(err);
        throw new Error("Erreur lors de la requête");
    });
    const data = await response.json();
    return data.label;
};
