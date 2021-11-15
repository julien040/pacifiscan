import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Ajoute un élément (String, array, object) à la fin d'un tableau. Si le tableau n'existe pas, il est créé.
 * Utilise AsyncStorage pour garantir une persistence
 * @param {string} name - Le nom de la variable à sauvegarder
 * @param {object|string|string[]|object[]} value - L'objet à ajouter à la fin du tableau
 * @example <caption> Ajoute le string myValue à la fin du tableau myArray </caption>
 * addToArray('myArray', 'myValue');
 * @returns {Promise<Array>} - Un tableau avec la valeur ajoutée à la fin
 */

export const addToArray = async (name, value) => {
  try {
    const v = await AsyncStorage.getItem(name);
    if (v === null) { //Si l'élément n'existe pas encore
      await AsyncStorage.setItem(name, JSON.stringify([value]));
      return await AsyncStorage.getItem(name);
    } else { //Si l'élément existe déjà
      const array = JSON.parse(v);
      array.push(value);
      await AsyncStorage.setItem(name, JSON.stringify(array));
      return array;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retourne le tableau contenant les éléments de la variable name
 * @param {string} name - Le nom de la variable à retourner
 * @returns {Promise<Array>}  Un tableau correspondant à la variable demandée
 * @example
 * // Retourne un tableau contenant les éléments de la variable "myArray"
 * getArray("myArray");
 */
export const getArray = async (name) => {
  try {
    const v = await AsyncStorage.getItem(name);
    if (v === null) {
      return [];
    } else {
      return JSON.parse(v);
    }
  } catch (error) {
    console.error(error);
  }
};


/**
 * Retourne le tableau contenant les éléments de la variable name
 * @param {string} name - Le nom de la variable à retourner
 * @param {number} index - La position de l'élément à supprimer
 * @throws Une erreur sera créée si l'élement n'existe pas 
 * @example
 * // Supprime un élément du tableau course à la position 10
 * deleteFromArray("course", 10);
 * @returns {Promise<Array>} Un tableau correspondant à la variable demandée avec l'élément supprimé
 */
 export const deleteFromArray = async (name, index) => {
    try {
        const v = await AsyncStorage.getItem(name);
        if (v === null) {
            throw new Error("L'élément n'existe pas");
        }
        else {
            let array = JSON.parse(v);
            array.splice(index, 1);
            await AsyncStorage.setItem(name, JSON.stringify(array));
            return array;
        }
    } catch (error) {
        console.error(error);
    }
  };
  /**
   * Vide le tableau de la variable name.
   * @param  {string} name
   * @returns {Promise<Array>} Un tableau vide
   * @example <caption> Vide le tableau "course" </caption>
   * clearArray("course");
   */
  export const clearArray = async (name) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify([]));
      return [];
      
    } catch (error) {
      console.error(error);
    }
  };
  