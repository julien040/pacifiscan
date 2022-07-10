import React, { useRef } from "react";
import { Platform } from "react-native";
import OuJeter from "../components/ouJeter";
import CrossIcon from "../components/crossIcon";
import { SafeAreaView } from "react-native-safe-area-context";
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
  IconButton,
} from "native-base";
import pacifiScanTheme from "../src/custom_theme/theme";
import { useEffect } from "react";
import Dechet from "../src/donnees/dechets";

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
  const { id, synonyme } = route.params; //On récupère les arguments donnés par le composant qui a appelé cette page
  /** @type {Dechet["Vélo"]}
   */
  const data = Dechet[id];
  const bottomSheetRef = useRef();
  if (!data) {
    //Dans le cas où l'api retournerait un item qui n'existe pas dans l'application
    return (
      <Flex backgroundColor="brand.pbackground" p={4} flex={1}>
        <PacifiScanHeader variant="back" />
        <Text textAlign="center" my="auto">
          Ce déchet n'existe malheureusement pas dans cette version{"\n"}
          Veuillez mettre à jour l'application.
        </Text>
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
        <Flex
          backgroundColor="brand.pbackground"
          paddingBottom={1}
          p={4}
          flex={1}
          justify="space-between"
        >
          <PacifiScanHeader variant="back" />

          <ScrollView flex={1}>
            <Image
              size={95}
              margin="auto"
              alt="L'image"
              source={{ uri: data.icone }}
            />
            <Heading textAlign="center" fontSize={22} marginBottom={0}>
              {id}
            </Heading>
            {synonyme && (
              <Text
                color="blueGray.600"
                fontFamily="Inter_500Medium"
                fontSize={14}
              >
                Synonyme de : {synonyme}
              </Text>
            )}
            <Heading marginTop={4} marginBottom={1} color="brand.iris100">
              Qu'en faire ?
            </Heading>
            <Text fontFamily="Inter_500Medium">{data.queFaire}</Text>
            {data.commentEviter && (
              <>
                <Heading marginTop={4} marginBottom={1} color="brand.iris100">
                  Comment l'éviter ?
                </Heading>
                <Text fontFamily="Inter_500Medium">{data.commentEviter}</Text>
              </>
            )}
          </ScrollView>

          {/* Case when there is no information in the DB, the "ou jeter" button must not be shown */}
          {data.collecte === null && data.ouDeposer === null ? (
            <Button isDisabled>Aucune donnée disponible</Button>
          ) : (
            <Button onPress={handleBottomSheet}>Où jeter ?</Button>
          )}
        </Flex>
        <BottomSheet
          backgroundStyle={{ backgroundColor: "#EFF0FF" }}
          ref={bottomSheetRef}
          onChange={handleBottomSheetChange}
          snapPoints={["70%", "100%"]}
          index={-1}
        >
          <Flex align={"center"} justify="space-between" direction="row" px={3}>
            <Text
              fontSize={15}
              color="blueGray.600"
              fontFamily="Inter_600SemiBold"
            >
              Où jeter votre déchet ?
            </Text>
            <IconButton
              _icon={{ as: CrossIcon }}
              onPress={() => bottomSheetRef.current.close()}
            />
          </Flex>

          <OuJeter id={id} />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default Item;
