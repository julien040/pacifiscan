import React from "react";
import { SmallSucce } from "../components/singleItem";
import { wastesType } from "../src/waste/waste";
import { Flex, ScrollView, Heading } from "native-base";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
/* 
    Ceci est la page qui correspond au 5eme élément de la barre de navigation.
    Il s'appelle Infos
    Sur cette page, on peut voir l'ensemble des items ainsi que s'ils ont été débloqués ou non
    Si on clique sur un, on accède à la page correspondante à l'item

    En bas de la page, on peut accèder à des news de l'application PacifiScan. Pour y accèder, l'application fait une requête à l'api Strapi

 */
function Succe({ route, navigation }) {
  return (
    <Flex
      backgroundColor="brand.appColor"
      p={4}
      flex={1}
      justify="space-between"
    >
      <PacifiScanHeader />
      <Heading marginTop={4} marginBottom={2} >Déchets</Heading>
      <ScrollView>
        <Flex
          direction="row"
          justify="space-around"
          align="center"
          flex={1}
          wrap="wrap"
        >
          {Object.keys(wastesType).map((key) => (
            <SmallSucce
              key={key}
              intern={key}
              title={wastesType[key].nom}
              image={wastesType[key].image}
              description={wastesType[key].smallText}
              isBlocked={wastesType[key].blocked}
            />
          ))}
        </Flex>
      </ScrollView>
      <PacifiScanFooter active="Info" />
    </Flex>
  );
}

export default Succe;
