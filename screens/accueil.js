import React, { useEffect } from "react";
import { Flex, Heading, Text } from "native-base";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import { HomeSucces } from "../components/homeScrollSucces";
import AccueilHistorique from "../components/accueilHistorique";
import AccueilStories from "../components/accueilStories";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { HomeHeading } from "../components/heading";
import { setStatusBarStyle } from "expo-status-bar";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";

function Accueil({ route, navigation }) {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#EFF0FF");
    setStatusBarStyle("dark");
    if (Platform.OS === "android") {
      setBackgroundColorAsync("#EFF0FF");
      setButtonStyleAsync("dark");
    }
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
      <Flex
        backgroundColor="brand.appColor"
        paddingBottom={1}
        p={4}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader variant="home" />
        <Flex justify="flex-start">
          <Flex align={"center"} direction="row" justify={"space-between"}>
            <HomeHeading>Déchets</HomeHeading>

            <Pressable
              onPress={() => {
                navigation.navigate("Infos");
              }}
              style={{ flex: 1 }}
            >
              <Text
                style={{ textAlign: "right" }}
                color="brand.iris80"
                fontFamily="Inter_500Medium"
                letterSpacing={-0.65}
              >
                Voir les déchets {">"}
              </Text>
            </Pressable>
          </Flex>

          <HomeSucces />
        </Flex>
        <Flex overflow="hidden">
          <Flex align={"center"} direction="row" justify={"space-between"}>
            <HomeHeading>Historique</HomeHeading>
            <Pressable
              onPress={() => {
                navigation.navigate("Historique");
              }}
              style={{ flex: 1 }}
            >
              <Text
                style={{ textAlign: "right" }}
                color="brand.iris80"
                fontFamily="Inter_500Medium"
                letterSpacing={-0.65}
              >
                Voir l'historique {">"}
              </Text>
            </Pressable>
          </Flex>
          <AccueilHistorique />
        </Flex>
        <Flex overflow="hidden" my={3} flex={1}>
          <Flex align={"center"} direction="row" justify={"space-between"}>
            <HomeHeading>Stories</HomeHeading>
            <Pressable
              onPress={() => {
                navigation.navigate("Stories");
              }}
              style={{ flex: 1 }}
            >
              <Text
                style={{ textAlign: "right" }}
                color="brand.iris80"
                p={1}
                fontFamily="Inter_500Medium"
                letterSpacing={-0.65}
              >
                Voir toutes les stories {">"}
              </Text>
            </Pressable>
          </Flex>
          <AccueilStories />
        </Flex>

        <PacifiScanFooter active="Home" />
      </Flex>
    </SafeAreaView>
  );
}

export default Accueil;
