import { Flex, Text } from "native-base";
import React, { Fragment } from "react";
import { Pressable } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { useTheme } from "native-base";
import { useNavigation } from '@react-navigation/native';
/* 
** Le composant possède cinq variantes pour chaque état de l'application

  La couleur de l'icone change suivant la page active.

  La propriété "active" de PacifiScanFooter prend en paramètre un String qui a la première lettre en majuscule

 */
const PacifiScanFooter = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const items = [
    {
      icon: "Home",
      name: "Accueil",
    },
    {
      icon: "Search",
      name: "Caddy",
    },
    {
      icon: "Scan",
      name: "Scan",
    },
    {
      icon: "Rewind",
      name: "Historique",
    },
    {
      icon: "Info",
      name: "Infos",
    },
  ];

  return (
    <Flex
      borderRadius={10}
      p={1}
      marginTop={2}
      /* backgroundColor={colors.brand.p45} */ direction="row"
      justify="space-around" 
    > 
      {items.map((item) => (
        
          <Pressable key={item.icon} style={{display:"flex", justifyContent:"center", alignContent:"center", alignItems:"center"}}  onPress={() => navigation.navigate(item.name)}  >
          <Icone isActive={props.active == item.icon} icon={item.icon} />
          <Text fontSize={12} fontWeight={700}>
            {item.name}
          </Text>
          </Pressable>
        
      ))}
    </Flex>
  );
};

/* 
  Chaque icone possède une variante pour chaque état de l'application.
  L'icône prend donc une propriété isActive? qui est un booléen
  Si cette valeur est vraie, elle est colorée en iris100, sinon en primary grâce à une condition ternaire.

  Il y a 5 icônes différentes, pour éviter la réutilisation de code, un array est défini avec à chaque fois le dessin de l'icone.

  Le composant Icone prend aussi en props "ic" qui correspond à l'icône demandée (Home, Info, Rewind, Scan, Search).

  Puisque JSX demande qu'une fontion retourne toujours un parent, on utilise un fragment pour avoir un groupe.
*/

//Accueil :
const Icone = (props) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      fill={props.isActive ? colors.brand.iris100 : colors.brand.primary}
      xmlns="http://www.w3.org/2000/svg"
    >
      {icones[props.icon]}
    </Svg>
  );
};

/* 
  Les icônes ont été générées depuis Figma. La propriété fill leur est retirée puisque gérée par le composant parent avec la propriété fill

 */
const icones = {
  Home: (
    <Path d="M21.1836 10.8359L12.1273 1.78437L11.5203 1.17734C11.382 1.03994 11.195 0.96283 11 0.96283C10.805 0.96283 10.618 1.03994 10.4797 1.17734L0.816409 10.8359C0.674685 10.9771 0.562678 11.1452 0.487 11.3304C0.411321 11.5156 0.373505 11.714 0.375784 11.9141C0.385159 12.7391 1.07188 13.3977 1.89688 13.3977H2.89297V21.0312H19.107V13.3977H20.1242C20.525 13.3977 20.9023 13.2406 21.1859 12.957C21.3256 12.8178 21.4362 12.6523 21.5115 12.4701C21.5867 12.2878 21.625 12.0925 21.6242 11.8953C21.6242 11.4969 21.4672 11.1195 21.1836 10.8359V10.8359ZM12.3125 19.3437H9.6875V14.5625H12.3125V19.3437ZM17.4195 11.7102V19.3437H13.8125V14C13.8125 13.482 13.393 13.0625 12.875 13.0625H9.125C8.60703 13.0625 8.1875 13.482 8.1875 14V19.3437H4.58047V11.7102H2.33047L11.0023 3.04531L11.5438 3.58672L19.6719 11.7102H17.4195Z" />
  ),
  Info: (
    <Fragment>
      <Path d="M19.875 3H4.125C2.953 3 2 3.897 2 5V19C2 20.103 2.953 21 4.125 21H19.875C21.047 21 22 20.103 22 19V5C22 3.897 21.047 3 19.875 3ZM19.875 19H4.125C4.068 19 4.029 18.984 4.012 18.984C4.005 18.984 4.001 18.986 4 18.992L3.988 5.046C3.995 5.036 4.04 5 4.125 5H19.875C19.954 5.001 19.997 5.028 20 5.008L20.012 18.954C20.005 18.964 19.96 19 19.875 19Z" />
      <Path d="M6 7H12V13H6V7ZM13 15H6V17H18V15H14H13ZM14 11H18V13H14V11ZM14 7H18V9H14V7Z" />
    </Fragment>
  ),
  Rewind: (
    <Path d="M4.719 4.5h.906a1.125 1.125 0 010 2.25h-3.75A1.125 1.125 0 01.75 5.625v-3.75a1.125 1.125 0 112.25 0v1.172a9 9 0 11-2.16 7.237 1.126 1.126 0 112.229-.318A6.752 6.752 0 104.719 4.5zm4.656 0A1.125 1.125 0 0110.5 5.625V8.25h1.125a1.125 1.125 0 110 2.25h-2.25A1.125 1.125 0 018.25 9.375v-3.75A1.125 1.125 0 019.375 4.5z" />
  ),
  Scan: (
    <Fragment>
      <Path
        d="M9.708 4.333a4.875 4.875 0 00-4.875 4.875v.774a1.625 1.625 0 003.25 0v-.774a1.625 1.625 0 011.625-1.625h.774a1.625 1.625 0 000-3.25h-.774zm6.81 0a1.625 1.625 0 000 3.25h.774a1.625 1.625 0 011.625 1.625v.774a1.625 1.625 0 003.25 0v-.774a4.875 4.875 0 00-4.875-4.875h-.774zM8.083 16.018a1.625 1.625 0 00-3.25 0v.774a4.875 4.875 0 004.875 4.875h.774a1.625 1.625 0 100-3.25h-.774a1.625 1.625 0 01-1.625-1.625v-.774zm14.084 0a1.625 1.625 0 10-3.25 0v.774a1.625 1.625 0 01-1.625 1.625h-.774a1.625 1.625 0 000 3.25h.774a4.874 4.874 0 004.875-4.875v-.774zm-11.375-4.643a1.625 1.625 0 100 3.25h5.416a1.625 1.625 0 000-3.25h-5.416z"
        /* fill="#fff" */
      />
      <Path d="M9.708 4.333a4.875 4.875 0 00-4.875 4.875v.774a1.625 1.625 0 003.25 0v-.774a1.625 1.625 0 011.625-1.625h.774a1.625 1.625 0 000-3.25h-.774zm6.81 0a1.625 1.625 0 000 3.25h.774a1.625 1.625 0 011.625 1.625v.774a1.625 1.625 0 003.25 0v-.774a4.875 4.875 0 00-4.875-4.875h-.774zM8.083 16.018a1.625 1.625 0 00-3.25 0v.774a4.875 4.875 0 004.875 4.875h.774a1.625 1.625 0 100-3.25h-.774a1.625 1.625 0 01-1.625-1.625v-.774zm14.084 0a1.625 1.625 0 10-3.25 0v.774a1.625 1.625 0 01-1.625 1.625h-.774a1.625 1.625 0 000 3.25h.774a4.874 4.874 0 004.875-4.875v-.774zm-11.375-4.643a1.625 1.625 0 100 3.25h5.416a1.625 1.625 0 000-3.25h-5.416z" />
    </Fragment>
  ),
  Search: (
    <Path d="M19.569 18.027l-6.087-6.086a6.968 6.968 0 001.456-4.285c0-1.88-.734-3.642-2.06-4.97A6.98 6.98 0 007.905.624a6.99 6.99 0 00-4.97 2.06A6.975 6.975 0 00.874 7.656c0 1.878.734 3.645 2.06 4.971a6.975 6.975 0 004.971 2.06c1.57 0 3.061-.51 4.282-1.453l6.087 6.085a.19.19 0 00.136.056.191.191 0 00.136-.056l1.022-1.02a.19.19 0 00.041-.21.191.191 0 00-.041-.062zm-7.95-6.658a5.222 5.222 0 01-3.713 1.537 5.222 5.222 0 01-3.712-1.537 5.222 5.222 0 01-1.538-3.713c0-1.401.546-2.72 1.538-3.712a5.222 5.222 0 013.712-1.538c1.402 0 2.721.544 3.713 1.538a5.222 5.222 0 011.537 3.712 5.218 5.218 0 01-1.537 3.713z" />
  ),
};

export default PacifiScanFooter;
