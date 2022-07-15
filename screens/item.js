import React, { useRef, useState } from "react";
import { Platform, ScrollView } from "react-native";
import OuJeter from "../components/ouJeter";
import { SafeAreaView } from "react-native-safe-area-context";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { Flex, Text, Image, Button, Spinner } from "native-base";
import Spacer from "../components/spacer";
import pacifiScanTheme from "../src/custom_theme/theme";
import { useEffect } from "react";
import Dechet from "../src/donnees/dechets";
import synonymes from "../src/donnees/synonymes";
import { SimpleText400 } from "../components/text";
import { MediumHeading, LargeHeading } from "../components/heading";

import { PacifiScanHeader } from "../components/index";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Item({ route, navigation }) {
  // this state is set to true when the bottom sheet is open
  // It avoids loading geolocation when not requested
  const [bottomSheetOpenedOnce, setBottomSheetOpenedOnce] = useState(false);
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
  /** @type {Dechet["Vélo"]}
   */
  const data = synonymes[id];
  const fiche = Dechet[data.fiche];
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
    setBottomSheetOpenedOnce(true);
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

          <ScrollView style={{ flex: 1 }}>
            <Image
              size={136}
              margin="auto"
              alt="L'image"
              source={{ uri: data.icone }}
            />
            <LargeHeading centered>{data.nom}</LargeHeading>
            <Spacer />
            <MediumHeading colored>Qu'en faire ?</MediumHeading>
            <SimpleText400>{fiche.queFaire}</SimpleText400>
            {fiche.commentEviter && (
              <>
                <MediumHeading colored>Comment l'éviter ?</MediumHeading>
                <SimpleText400>{fiche.commentEviter}</SimpleText400>
              </>
            )}
          </ScrollView>

          {/* Case when there is no information in the DB, the "ou jeter" button must not be shown */}
          {fiche.collecte === null && fiche.ouDeposer === null ? (
            <Button isDisabled>Aucune donnée disponible</Button>
          ) : (
            <Button onPress={handleBottomSheet}>Où jeter ?</Button>
          )}
        </Flex>
        <BottomSheet
          backgroundStyle={{ backgroundColor: "#EFF0FF" }}
          ref={bottomSheetRef}
          onChange={handleBottomSheetChange}
          snapPoints={["60%", "100%"]}
          enablePanDownToClose={true}
          index={-1}
        >
          {!bottomSheetOpenedOnce ? (
            <Spinner size={50} color={"brand.iris80"} my={12} />
          ) : (
            <>
              <Text
                letterSpacing={-0.5}
                marginBottom={2}
                px={3}
                fontFamily="Inter_600SemiBold"
              >
                Où jeter votre déchet ?
              </Text>
              <OuJeter id={data.fiche} />
            </>
          )}
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default Item;
