/* 
    Copyright : Julien Cagniart - Tous droits réservés
    Ce code est sous licence MIT. Il est préférable, avant toute réutilisation ou distribution, de contacter l'équipe responsable du projet.
    Ecrit par Julien Cagniart, 2021
    Contact : julien
 */
const points = {
  decheterieGadji: {
    name: "Déchetterie Gadji",
    location: "Route du Quai de Gadji",
    phone: "010203",
    description: "La déchetterie Gadji est située ... Elle dispose d'un espace de stockage de déchets et d'un espace de compostage",
    icon:require("../../assets/wasteImage/can.png"),
  },
  decheterieDucos: {
    name: "Déchetterie de Ducos",
    location: "11, rue Pélatan, ZI Ducos",
    phone: "010203",
    description: "Adipisicing Lorem cupidatat duis deserunt enim ex veniam veniam in.",
    icon:require("../../assets/wasteImage/can.png"),
  },
  decheterieMagenta: {
    name: "Déchetterie de Magenta",
    location: "177 voie de dégagement est",
    phone: "010203",
    description: "Sint laboris ut excepteur occaecat ipsum nostrud.e",
    icon:require("../../assets/wasteImage/can.png"),
  },
  decheterie4: {
    name: "Déchetterie du 6ème km",
    location: "Rue Jacques-Iékawé",
    phone: "010203",
    description: "Sint laboris ut excepteur occaecat ipsum nostrud.e",
    icon:require("../../assets/wasteImage/can.png"),
  },
};

export const wastesType = {
  electromenager: {
    image: require("../../assets/wasteImage/can.png"),
    nom: "Lave vaisselle",
    smallText: "Petit texte",
    description:"Est considéré comme electroménager tout ce qui se branche à une prise et qui a une fonction",
    blocked: true,
    Header: "Impact de l'electroménager sur la nature",
    quefaireTexte:
      "Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.",
    quefaireSmiley: require("../../assets/emoji/ange.png"),
    eviterTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    eviterSmiley: require("../../assets/emoji/love.png"),
    impactTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    impactSmiley: require("../../assets/emoji/love.png"),
    poids: 0.5,
    anneeDecomposition: 2000,
    endroit:[points.decheterieGadji, points.decheterieDucos],
    sources: "Réserves XXl, Wikipédia",
    
  },
  canette: {
    image: require("../../assets/wasteImage/can.png"),
    nom: "Canette",
    smallText: "Petit texte",
    blocked: false,
    Header: "Impact d'une canette dans l'océan",
    quefaireTexte:
      "Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.",
    quefaireSmiley: require("../../assets/emoji/ange.png"),
    eviterTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    eviterSmiley: require("../../assets/emoji/love.png"),
    impactTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    impactSmiley: require("../../assets/emoji/love.png"),
    poids: 0.5,
    anneeDecomposition: 2000,
    sources: "Réserves XXl, Wikipédia",
  },
  bouteille: {
    image: require("../../assets/wasteImage/biere.png"),
    nom: "Bouteille",
    smallText: "Petit texte",
    blocked: false,
    Header: "Impact de l'electroménager sur la nature",
    quefaireTexte:
      "Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.",
    quefaireSmiley: require("../../assets/emoji/ange.png"),
    eviterTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    eviterSmiley: require("../../assets/emoji/love.png"),
    impactTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    impactSmiley: require("../../assets/emoji/love.png"),
    poids: 0.5,
    anneeDecomposition: 2000,
    sources: "Réserves XXl, Wikipédia",
  },
  stylo: {
    image: require("../../assets/wasteImage/pencil.png"),
    nom: "Stylo",
    smallText: "Petit texte",
    blocked: true,
    Header: "Impact de l'electroménager sur la nature",
    quefaireTexte:
      "Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.",
    quefaireSmiley: require("../../assets/emoji/ange.png"),
    eviterTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    eviterSmiley: require("../../assets/emoji/love.png"),
    impactTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    impactSmiley: require("../../assets/emoji/love.png"),
    poids: 0.5,
    anneeDecomposition: 2000,
    sources: "Réserves XXl, Wikipédia",
  },
  poubelle: {
    image: require("../../assets/wasteImage/trash.png"),
    nom: "Poubelle",
    smallText: "Petit texte",
    blocked: false,
    Header: "Impact de l'electroménager sur la nature",
    quefaireTexte:
      "Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.",
    quefaireSmiley: require("../../assets/emoji/ange.png"),
    eviterTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    eviterSmiley: require("../../assets/emoji/love.png"),
    impactTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    impactSmiley: require("../../assets/emoji/love.png"),
    poids: 0.5,
    anneeDecomposition: 2000,
    sources: "Réserves XXl, Wikipédia",
  },
  a: {
    image: require("../../assets/wasteImage/pencil.png"),
    nom: "Un objet",
    smallText: "Petit texte",
    blocked: false,
    Header: "Impact de l'electroménager sur la nature",
    quefaireTexte:
      "Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.",
    quefaireSmiley: require("../../assets/emoji/ange.png"),
    eviterTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    eviterSmiley: require("../../assets/emoji/love.png"),
    impactTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    impactSmiley: require("../../assets/emoji/love.png"),
    poids: 0.5,
    anneeDecomposition: 2000,
    sources: "Réserves XXl, Wikipédia",
  },
  b: {
    image: require("../../assets/wasteImage/pencil.png"),
    nom: "Koukou",
    smallText: "Petit texte",
    blocked: false,
    Header: "Impact de l'electroménager sur la nature",
    quefaireTexte:
      "Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.",
    quefaireSmiley: require("../../assets/emoji/ange.png"),
    eviterTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    eviterSmiley: require("../../assets/emoji/love.png"),
    impactTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    impactSmiley: require("../../assets/emoji/love.png"),
    poids: 0.5,
    anneeDecomposition: 2000,
    sources: "Réserves XXl, Wikipédia",
  },
  c: {
    image: require("../../assets/wasteImage/pencil.png"),
    nom: "b612",
    smallText: "Petit texte",
    blocked: false,
    Header: "Impact de l'electroménager sur la nature",
    quefaireTexte:
      "Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.",
    quefaireSmiley: require("../../assets/emoji/ange.png"),
    eviterTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    eviterSmiley: require("../../assets/emoji/love.png"),
    impactTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    impactSmiley: require("../../assets/emoji/love.png"),
    poids: 0.5,
    anneeDecomposition: 2000,
    sources: "Réserves XXl, Wikipédia",
  },
  d: {
    image: require("../../assets/wasteImage/pencil.png"),
    nom: "dechet",
    smallText: "Petit texte",
    blocked: false,
    Header: "Impact de l'electroménager sur la nature",
    quefaireTexte:
      "Incididunt pariatur excepteur aliquip fugiat nostrud ipsum mollit commodo sunt adipisicing sunt dolor.",
    quefaireSmiley: require("../../assets/emoji/ange.png"),
    eviterTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    eviterSmiley: require("../../assets/emoji/love.png"),
    impactTexte:
      "Exercitation nulla ipsum do quis sit sit elit ex ad consequat deserunt adipisicing incididunt.",
    impactSmiley: require("../../assets/emoji/love.png"),
    poids: 0.5,
    anneeDecomposition: 2000,
    sources: "Réserves XXl, Wikipédia",
  },
};

export const associationApi = {
  Light: "electromenager",
  Firearm: "electromenager",
  "Wiper blade": "electromenager",
  "Aluminum tray": "electromenager",
  "Plastic container": "electromenager",
  "Automotive battery": "electromenager",
  "Phone battery": "electromenager",
  "Egg box": "electromenager",
  "Pizza box": "electromenager",
  "Tin can": "electromenager",
  "Metal box": "electromenager",
  "Plastic box": "electromenager",
  "Spray can": "electromenager",
  "Cork stoppers": "electromenager",
  "Detergent bottle": "electromenager",
  "Metal bottle": "electromenager",
  "Plastic bottle": "electromenager",
  "Glass bottle": "electromenager",
  Coffee: "electromenager",
  Bobbin: "electromenager",
  "Coffee capsules": "electromenager",
  Cardboard: "electromenager",
  "Ink cartridge": "electromenager",
  Cigarette: "electromenager",
  "Green waste": "electromenager",
  Electronic: "electromenager",
  "Plastic film": "electromenager",
  "Coffee filter": "electromenager",
  "Plastic bottle": "electromenager",
  "Fruits and vegetables": "electromenager",
  "Plastic cup": "electromenager",
  "Large household appliances": "electromenager",
  Toy: "electromenager",
  Newspaper: "electromenager",
  Mask: "electromenager",
  Furniture: "electromenager",
  Tissue: "electromenager",
  Straw: "electromenager",
  "Aluminum foil": "electromenager",
  "Small appliance": "electromenager",
  "Disposable battery": "electromenager",
  Tire: "electromenager",
  "Plastic tote bag": "electromenager",
  "Biodegradable plastic bag": "electromenager",
  "Garbage bag": "electromenager",
  Pen: "electromenager",
  "Tetra Pak": "electromenager",
  "Porcelain tableware": "electromenager",
  Clothes: "electromenager",
};
