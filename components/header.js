import { Heading, Flex, IconButton, View } from "native-base";
import React from "react";
import { Pressable } from "native-base";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";

/* 
** Le composant possède trois variantes : back, settings et non définie

  Back correspond au header lorsque l'application est dans une fenêtre modale
  Settings lorsque l'application est dans la fenêtre de paramètres
  Non définie pour le reste

  Pour déterminer la variante, on utilise un switch
 */
/**
 * Prend en argument soit "back" ou "settings"
 * @param  {string} {variant}
 */
const PacifiScanHeader = ({ variant }) => {
  const navigation = useNavigation();
  switch (variant) {
    case "settings":
    case "modal":
    case "back":
      return (
        <Flex
          width="100%"
          direction="row"
          justify="space-between"
          align="center"
        >
          <IconButton
            _icon={{ as: GoBack }}
            onPress={() => navigation.goBack()}
          />
          <Heading fontSize={22} color="brand.logo">
            Pacifiscan
          </Heading>
        </Flex>
      );
    case "home":
      return (
        <Flex
          direction="row"
          justify="space-between"
          width="100%"
          align="center"
        >
          <Heading fontSize={22} color="brand.logo">
            Pacifiscan
          </Heading>
          <IconButton
            _icon={{
              as: Info,
            }}
            onPress={() => navigation.navigate("Parametre")}
            _pressed={{ backgroundColor: "brand.p45", borderRadius: 6 }}
          />
        </Flex>
      );
    default:
      return (
        <Flex
          width="100%"
          /*             direction="row"
            justify="space-between" */
          align="center"
        >
          <Heading fontSize={22} color="brand.logo">
            Pacifiscan
          </Heading>
          {/*             <IconButton
              icon={Roue}
              onPress={() => navigation.navigate("Parametre")}
              _pressed={{ backgroundColor: "brand.p45", borderRadius: 6 }}
            /> */}
        </Flex>
      );
  }
};

const GoBack = (
  <Svg width={19} height={17} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M19 7.5H4.414l5.293-5.293L8.293.793.586 8.5l7.707 7.707 1.414-1.414L4.414 9.5H19v-2z"
      fill="black"
    />
  </Svg>
);

const Info = (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width={17}
    height={17}
    viewBox="0 0 24 24"
  >
    <Path
      fill="#3935FF"
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 14a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0Zm-1-7a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z"
    />
  </Svg>
);

const Roue = (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12 4a1 1 0 0 0-1 1c0 1.692-2.046 2.54-3.243 1.343a1 1 0 1 0-1.414 1.414C7.54 8.954 6.693 11 5 11a1 1 0 1 0 0 2c1.692 0 2.54 2.046 1.343 3.243a1 1 0 0 0 1.414 1.414C8.954 16.46 11 17.307 11 19a1 1 0 1 0 2 0c0-1.692 2.046-2.54 3.243-1.343a1 1 0 1 0 1.414-1.414C16.46 15.046 17.307 13 19 13a1 1 0 1 0 0-2c-1.692 0-2.54-2.046-1.343-3.243a1 1 0 0 0-1.414-1.414C15.046 7.54 13 6.693 13 5a1 1 0 0 0-1-1zm-2.992.777a3 3 0 0 1 5.984 0 3 3 0 0 1 4.23 4.231 3 3 0 0 1 .001 5.984 3 3 0 0 1-4.231 4.23 3 3 0 0 1-5.984 0 3 3 0 0 1-4.231-4.23 3 3 0 0 1 0-5.984 3 3 0 0 1 4.231-4.231z"
      fill="#0D0D0D"
    />
    <Path
      d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-2.828-.828a4 4 0 1 1 5.656 5.656 4 4 0 0 1-5.656-5.656z"
      fill="#0D0D0D"
    />
  </Svg>
);

export default PacifiScanHeader;
