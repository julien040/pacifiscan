import React, { useRef } from "react";
import { Platform } from "react-native";
import { wastesType, worried } from "../src/waste/waste";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import {
  Flex,
  ScrollView,
  Heading,
  Text,
  Image,
  Button,
  View,
} from "native-base";
import pacifiScanTheme from "../src/custom_theme/theme";
import { useEffect } from "react";

import { PacifiScanHeader } from "../components/index";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import * as Linking from "expo-linking";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Item({ route, navigation }) {
  useEffect(() => {
    if (Platform.OS === "android") {
      const backgroundColorModal = pacifiScanTheme.colors.brand.pbackground;

      setBackgroundColorAsync(backgroundColorModal);
      setStatusBarBackgroundColor(backgroundColorModal);
    }

    return () => {
      if (Platform.OS === "android") {
        const backgroundColorApp = pacifiScanTheme.colors.brand.appColor;
        setBackgroundColorAsync(backgroundColorApp);
        setStatusBarBackgroundColor(backgroundColorApp);
      }
    };
  }, []);
  const { id } = route.params; //On récupère les arguments donnés par le composant qui a appelé cette page
  /** @type {wastesType["Ampoule"]}
   */
  const data = wastesType[id];
  const bottomSheetRef = useRef();
  if (!data) {
    //Dans le cas où l'api retournerait un item qui n'existe pas dans l'application
    return (
      <Flex backgroundColor="brand.appColor" p={4} flex={1}>
        <PacifiScanHeader variant="back" />
        <Heading>Cet item n'existe malheureusement pas</Heading>
      </Flex>
    );
  }
  // Button handler
  function handleBottomSheet() {
    bottomSheetRef.current.snapToIndex(0);
  }

  // Change the navigation bar color when the bottom sheet is open
  function handleBottomSheetChange(index) {
    if (Platform.OS === "android") {
      if (index < 0) {
        const backgroundColorModal = pacifiScanTheme.colors.brand.pbackground;
        setBackgroundColorAsync(backgroundColorModal);
      } else {
        const backgroundColorApp = pacifiScanTheme.colors.brand.appColor;
        setBackgroundColorAsync(backgroundColorApp);
      }
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Flex
        backgroundColor="brand.pbackground"
        p={4}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader variant="back" />
        <Heading marginBottom={2}>{id}</Heading>
        <ScrollView flex={1}>
          <Image
            size={120}
            margin="auto"
            alt="L'image"
            source={{ uri: data.image }}
          />
          <Flex>
            {/* Que faire début */}
            <Heading marginTop={8} marginBottom={1} color="brand.iris100">
              Qu'en faire ?
            </Heading>
            <Text fontFamily="Inter">{data.quefaireTexte}</Text>
            {/* Quel est son impact début */}
            <Heading marginTop={8} marginBottom={1} color="brand.iris100">
              Quel est son impact ?
            </Heading>
            <Text fontFamily="Inter">{data.impactTexte}</Text>
            {/* Comment éviter ce déchet début */}
            <Heading marginTop={8} marginBottom={1} color="brand.iris100">
              Comment l'éviter ?
            </Heading>
            <Text fontFamily="Inter">{data.eviterTexte}</Text>
            {/* Stats */}
            <Heading marginTop={8} fontSize={16}>
              En moyenne, cet objet pèse{" "}
              {data.poids >= 1
                ? data.poids + " kg "
                : data.poids * 1000 + " g "}
              et met{" "}
              {data.anneeDecomposition >= 1
                ? data.anneeDecomposition + " ans "
                : (data.anneeDecomposition * 12).toFixed(0).toString() +
                  " mois "}
              à se décomposer
            </Heading>
          </Flex>
          <Text
            marginTop={4}
            marginBottom={4}
            width="100%"
            textAlign="right"
            color="brand.primary"
          >
            Sources: {data.sources}
          </Text>
        </ScrollView>

        <Button onPress={handleBottomSheet}>Où jeter ?</Button>
      </Flex>
      <BottomSheet
        backgroundStyle={{ backgroundColor: "#EFF0FF" }}
        ref={bottomSheetRef}
        onChange={handleBottomSheetChange}
        snapPoints={["70%", "100%"]}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetComponent data={data} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

/**
 * @param  {wastesType["electromenager"]} {data}
 */
const BottomSheetComponent = ({ data }) => {
  return (
    <BottomSheetFlatList
      style={{ paddingLeft: 12, paddingRight: 12, paddingBottom: 12 }}
      ListHeaderComponent={
        <View my={1}>
          <Heading fontSize={18}>Où jeter ce déchet ?</Heading>
          <Text fontSize={13} color="gray.500" fontFamily="Inter">
            Découvrez les points de collecte de votre déchet
          </Text>
        </View>
      }
      data={data.ouJeter}
      renderItem={SinglePoint}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
import { points } from "../src/waste/waste";
const SinglePoint = ({ item }) => {
  item = points[item];
  return (
    <Flex marginTop={4} p={4} borderRadius={10} backgroundColor="brand.p45">
      <Flex direction="row">
        <Image
          marginRight={2}
          size={"24px"}
          source={{ uri: item.icon }}
          alt="Icone"
        />
        <Heading fontSize={18}>{item.name}</Heading>
      </Flex>
      <Text fontFamily="Inter" fontSize={13}>
        {item.description}
      </Text>

      <Button
        /* bgColor={"brand.pdark"} */
        alignSelf="flex-end"
        size={"sm"}
        onPress={() => Linking.openURL(item.seeMore)}
      >
        {item.type === "Déchetterie" ? "S'y rendre" : "Voir plus"}
      </Button>
    </Flex>
  );
};

export default Item;
