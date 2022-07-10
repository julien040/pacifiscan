import dechets from "./donnees/dechets";
import Collecte from "./donnees/collecte";
import Storage from "@react-native-async-storage/async-storage";

/** Retourne les endroits de collecte associés à un déchet
 * @param  {string} id
 * @returns {Promise<{ nom: string, description: string, icone: string, enSavoirPlus: string}[]>}
 */
async function getCollecte(id) {
  const pointCollecte = dechets[id].collecte;
  const commune = await getCommune();
  const res = [];
  if (pointCollecte) {
    for (let i = 0; i < pointCollecte.length; i++) {
      const element = Collecte[pointCollecte[i]];
      // We check if the "collecte" is available anywhere or if it is available in the user's city
      if (element.global === true || element.communes.includes(commune)) {
        res.push(element);
      }
    }
  }
  return res;
}
/**Permet de récupérer la commune de l'utilisateur
 * @returns {Promise<string | null>}
 */
async function getCommune() {
  return await Storage.getItem("commune");
}

export { getCollecte, getCommune };
