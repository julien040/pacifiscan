import { wastesType, associationApi } from "./waste/waste";

/**   
 * @typedef {[{
      name:string,
      score:string,
      quantity:number,
      co2:number,
      idBarCode:string,
    }]} caddy

    @typedef {[{
        type: string,
        timestamp: Date,
      }]} scanArray

    @typedef {[{date:Date, items:[caddy]}]} caddyArray
 */
/**
 * @param  {caddyArray} c
 */
export const getCaddyCount = (c) => {
  return c.length;
};

/** Cette fonction prend en argument un tableau donné par la base de données et retourne le poids total des déchets ramassés par l'utilisateur
 * @param  {scanArray} w
 * @returns {number}
 */
export const getWeightCount = (w) => {
  var weight = 0;
  for (let index = 0; index < w.length; index++) {
    const element = w[index];
    weight = weight + wastesType[associationApi[element.type]].poids;
  }
  return weight.toFixed(2);
};
/** Cette fonction prend en argument un tableau donné par la base de données et retourne le temps total de décomposition des déchets ramassés par l'utilisateur
 * @param  {scanArray} w
 */
export const getTimeCount = (w) => {
  var time = 0;
  for (let index = 0; index < w.length; index++) {
    const element = w[index];
    time = time + wastesType[associationApi[element.type]].anneeDecomposition;
  }
  return time.toFixed();
};

/** Cette fonction prend en argument un tableau donné par la base de données et retourne quel est le déchet le plus ramassé par l'utilisateur
 * @param  {scanArray} w
 */
export const mostScannedType = (w) => {
  let mostScanned = {};
  for (let index = 0; index < w.length; index++) {
    const element = w[index];
    if (mostScanned[element.type] === undefined) {
      mostScanned[element.type] = 1;
    } else {
      mostScanned[element.type]++;
    }
  }
  let max = "";
  let maxValue = 0;
  for (const key in mostScanned) {
    if (Object.hasOwnProperty.call(mostScanned, key)) {
      const element = mostScanned[key];
      if (element > maxValue) {
        maxValue = element;
        max = key;
      }
    }
  }
  return max;
};

/** Cette fonction prend en argument un tableau donné par la base de données et retourne quel est le déchet le plus ramassé par l'utilisateur
 * @param  {scanArray} w
 */
export const differentTypeDiscovered = (w) => {
  let differentType = [];
  for (let index = 0; index < w.length; index++) {
    const element = w[index];
    if (!differentType.includes(element.type)) {
      differentType.push(element.type);
    }
  }
  return differentType.length;
};
/**
 * @param  {caddyArray} c
 */
/*  export const getAverageScore = (c) => {
    return c.reduce((acc, cur) => {
        console.log(acc, cur);
        return acc + cur.items.reduce((acc, cur) => {
            return cur.score == null ? acc : acc + parseInt(cur.score);
        }, 0)/cur.items.length
        
    })/c.length;
}; */

/** Donne le co2
 * @param  {caddyArray} c
 */
export const getCountCo2 = (c) => {
  let co2 = 0;
  for (let index = 0; index < c.length; index++) {
    let count = 0;
    const element = c[index];
    for (let index = 0; index < element.items.length; index++) {
      const element2 = element.items[index];
      count = count + parseFloat((element2.co2 * element2.quantity) / 1000);
    }
    co2 = co2 + count;
  }
  return co2.toFixed(2);
};
