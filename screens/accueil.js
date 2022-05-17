import React from "react";
import { Flex, Heading, Text } from "native-base";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import { HomeSucces } from "../components/homeScrollSucces";
import AccueilHistorique from "../components/accueilHistorique";
import AccueilStories from "../components/accueilStories";

function Accueil({ route, navigation }) {
  return (
    <Flex
      backgroundColor="brand.appColor"
      p={4}
      flex={1}
      justify="space-between"
    >
      <PacifiScanHeader />
      <Flex justify="flex-start">
        <Flex align={"center"} direction="row" justify={"space-between"}>
          <Heading color="black" marginTop={3} marginBottom={3} p={0}>
            Déchets
          </Heading>
          <Text
            style={{ textAlign: "right" }}
            onPress={() => {
              navigation.navigate("Infos");
            }}
            color="brand.iris80"
          >
            Voir les déchets {">"}
          </Text>
        </Flex>

        <HomeSucces />
      </Flex>
      <Flex overflow="hidden">
        <Flex align={"center"} direction="row" justify={"space-between"}>
          <Heading color="black" marginTop={3} marginBottom={3}>
            Historique
          </Heading>
          <Text
            style={{ textAlign: "right" }}
            onPress={() => {
              navigation.navigate("Historique");
            }}
            color="brand.iris80"
          >
            Voir l'historique {">"}
          </Text>
        </Flex>
        <AccueilHistorique />
      </Flex>
      <Flex overflow="hidden" my={3} flex={1}>
        <Flex align={"center"} direction="row" justify={"space-between"}>
          <Heading color="black" marginTop={3} marginBottom={3} p={0}>
            Stories
          </Heading>
          <Text
            style={{ textAlign: "right" }}
            onPress={() => {
              navigation.navigate("Infos");
            }}
            color="brand.iris80"
            p={1}
          >
            Voir toutes les stories {">"}
          </Text>
        </Flex>
        <AccueilStories />
      </Flex>

      <PacifiScanFooter active="Home" />
    </Flex>
  );
}

export default Accueil;
