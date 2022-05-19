import { Flex, Text } from "native-base";
import React, { Fragment } from "react";
import { Pressable } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";
/* 
** Le composant possède cinq variantes pour chaque état de l'application

  La couleur de l'icone change suivant la page active.

  La propriété "active" de PacifiScanFooter prend en paramètre un String qui a la première lettre en majuscule

 */
const PacifiScanFooter = (props) => {
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
      icon: "Story",
      name: "Stories",
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
      maxHeight={16}
      marginTop={0}
      direction="row"
      justify="space-around"
    >
      {items.map((item) => (
        <Pressable
          key={item.icon}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            height: "100%",
            flex: 1,
            paddingTop: 8,
          }}
          onPress={() => navigation.navigate(item.name)}
          /* hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }} */
        >
          <Icone isActive={props.active == item.icon} icon={item.icon} />
          <Text fontSize={12}>{item.name}</Text>
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
      viewBox="0 0 24 24"
      color={props.isActive ? colors.brand.iris100 : colors.brand.primary}
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
    <Path
      fill="currentColor"
      d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"
    />
  ),
  Info: (
    <>
      <Path
        fill="currentColor"
        d="M19.875 3H4.125C2.953 3 2 3.897 2 5v14c0 1.103.953 2 2.125 2h15.75C21.047 21 22 20.103 22 19V5c0-1.103-.953-2-2.125-2zm0 16H4.125c-.057 0-.096-.016-.113-.016-.007 0-.011.002-.012.008L3.988 5.046c.007-.01.052-.046.137-.046h15.75c.079.001.122.028.125.008l.012 13.946c-.007.01-.052.046-.137.046z"
      />
      <Path
        fill="currentColor"
        d="M6 7h6v6H6zm7 8H6v2h12v-2h-4zm1-4h4v2h-4zm0-4h4v2h-4z"
      />
    </>
  ),
  Story: (
    <>
      <Path
        fill="currentColor"
        d="M19 2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2zm0 14H5V5c0-.806.55-.988 1-1h13v12z"
      />
    </>
  ),
  Scan: (
    <Path
      fill="currentColor"
      d="M6.5 3A3.5 3.5 0 0 0 3 6.5v1.864a1 1 0 0 0 2 0V6.5A1.5 1.5 0 0 1 6.5 5h1.864a1 1 0 0 0 0-2H6.5Zm9.136 0a1 1 0 1 0 0 2H17.5A1.5 1.5 0 0 1 19 6.5v1.864a1 1 0 1 0 2 0V6.5A3.5 3.5 0 0 0 17.5 3h-1.864ZM5 15.636a1 1 0 1 0-2 0V17.5A3.5 3.5 0 0 0 6.5 21h1.864a1 1 0 1 0 0-2H6.5A1.5 1.5 0 0 1 5 17.5v-1.864Zm16 0a1 1 0 1 0-2 0V17.5a1.5 1.5 0 0 1-1.5 1.5h-1.864a1 1 0 1 0 0 2H17.5a3.5 3.5 0 0 0 3.5-3.5v-1.864ZM8 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
    />
  ),
  Search: (
    <>
      <Path
        fill="currentColor"
        d="M21.08 7a2 2 0 0 0-1.7-1H6.58L6 3.74A1 1 0 0 0 5 3H3a1 1 0 0 0 0 2h1.24L7 15.26A1 1 0 0 0 8 16h9a1 1 0 0 0 .89-.55l3.28-6.56A2 2 0 0 0 21.08 7Zm-4.7 7H8.76L7.13 8h12.25Z"
      />
      <Circle cx={7.5} cy={19.5} r={1.5} fill="currentColor" />
      <Circle cx={17.5} cy={19.5} r={1.5} fill="currentColor" />
    </>
  ),
};

export default PacifiScanFooter;
