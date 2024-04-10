import synonymes from "./synonymes";
import dechets from "./dechets";
import materiaux from "./materiaux";

/**
 * Retourne l'id de la fiche du déchet
 * @param {string} id l'id du déchet
 * @returns {string | null} l'id de la fiche du déchet
 */
function findFicheID (idItem) {
    if (idItem in synonymes) {
        return synonymes[idItem].fiche;
    }
    return null;
}

/**
@typedef {Object} Synonymes
    @property {string} fiche
    @property {string} nom
    @property {string} icone
    @property {string} synonyme
*/

/**
 * 
 * @param {string} idItem 
 * @returns {Synonymes | null}
 */
function findSynonymes(idItem) {
    if (idItem in synonymes) {
        return synonymes[idItem];
    }
    return null;
}


/**
 @typedef {Object} Text
    @property {string} texte
    @property {string} heading
*/


/**
    @typedef {Object} Fiche
    @property {string} nom
    @property {string[]} ouDeposer
    @property {string[]} collecte
    @property {string[]} matiere
    @property {Text[]} texte
*/

/**
 * Retourne la fiche du déchet
 * @param {string} id 
 * @returns {Fiche | null}
 */
function findFiche (idFiche) {
    // Copy the data to avoid modifying the original data
    const data = JSON.parse(JSON.stringify(dechets[idFiche]));
    // Add Quefaire, Comment eviter as a text
    data["texte"] = []
    if ("queFaire" in data) {
        data["texte"].push({
            texte: data["queFaire"],
            heading: "Que faire ?"
        });
    }
    if ("commentEviter" in data) {
        data["texte"].push({
            texte: data["commentEviter"],
            heading: "Comment éviter ?"
        });
    }

    delete data["queFaire"];
    delete data["commentEviter"];

    return data;
}

function findIconeURI(id_item) {
    return synonymes[id_item].icone;
}
/**
@typedef {Object} Matiere
    @property {string} nom
    @property {string} description
    @property {string} icone
    @property {string} header
*/

/**
 * 
 * @param {*} idMat 
 * @returns {Matiere | null}
 */

function findMatiereData(idMat) {
    if (!(idMat in materiaux)) {
        return null;
    }

    return materiaux[idMat];
    
}


export {
    findFicheID,
    findFiche,
    findIconeURI,
    findMatiereData,
    findSynonymes
}