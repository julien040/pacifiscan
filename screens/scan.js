import React, { useState, useEffect } from "react";
import { Flex, Heading, Button, Spinner, Text } from "native-base";
import { Vibration } from "react-native";
import { Camera } from "expo-camera";
import { associationApi } from "../src/waste/waste";
import { BarCodeScanner } from "expo-barcode-scanner";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import { useIsFocused } from "@react-navigation/native";
import { DetectLabel } from "../src/scan";
import { addToArray } from "../src/database/array";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  logEventWithPropertiesAsync,
  logEventAsync,
} from "expo-analytics-amplitude";

function Scan({ route, navigation }) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [LoadingContent, setLoadingContent] = useState("Chargement...");
  const [Scanned, setScanned] = useState(false);
  const [Clicked, setClicked] = useState(false);
  var alreadyClicked = false;
  var refCamera;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status);
    })();
  }, []);
  async function HandleButton() {
    if (alreadyClicked) {
      return;
    } else {
      alreadyClicked = true;
    }
    try {
      const { base64 } = await refCamera.takePictureAsync({
        base64: true,
        exif: false,
        quality: 0.4,
      });
      setClicked(true);
      setLoadingContent("Récupération de la position...");
      const id = await AsyncStorage.getItem("id");
      logEventAsync("ScanRequest");
      setLoadingContent("Envoi de l'image...");
      const label = await DetectLabel(base64, id);
      const Item = associationApi[label];
      setLoadingContent(`Image analysée !`);
      Vibration.vibrate(100);
      logEventAsync("ScanDechet");
      await addToArray("Scanned", {
        type: label,
        timestamp: Date.now(),
      });
      AsyncStorage.setItem(Item, JSON.stringify(true));
      setClicked(false);
      navigation.navigate("Item", { id: Item });
    } catch (error) {
      setClicked(false);
    }
  }
  if (hasPermission === false) {
    return (
      <Flex
        backgroundColor="brand.appColor"
        p={3}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader />
        <Heading textAlign="center">
          Nous avons besoin de la permission photo pour scanner des objets
        </Heading>
        <Button
          onPress={() => {
            Camera.requestCameraPermissionsAsync();
          }}
        >
          Autoriser l'appli
        </Button>
        <PacifiScanFooter active="Scan" />
      </Flex>
    );
  } else if (hasPermission === null || isFocused === false) {
    return (
      <Flex backgroundColor="brand.appColor" p={3} flex={1} direction="column">
        <PacifiScanHeader />
        <Flex justify="center" align={"center"} flex={1}>
          <Spinner size={80} color="brand.iris80" />
          <Heading marginTop={6}>Chargement de la caméra...</Heading>
        </Flex>

        <PacifiScanFooter active="Scan" />
      </Flex>
    );
  } else if (Clicked) {
    return (
      <Flex
        backgroundColor="brand.appColor"
        p={3}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader />
        <Heading color="brand.iris100" textAlign="center">
          {LoadingContent}
        </Heading>
        <Spinner size={100} color="test" />

        <PacifiScanFooter active="Scan" />
      </Flex>
    );
  } else {
    return (
      <Flex
        backgroundColor="brand.appColor"
        p={3}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader />
        <Flex marginTop={2} marginBottom={2} flex={1} borderRadius={10}>
          <Camera
            ref={(ref) => {
              refCamera = ref;
            }}
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              padding: 15,
              alignContent: "center",
            }}
            ratio="16:9"
          >
            <Button
              marginTop={"auto"}
              onPress={() => HandleButton()}
              opacity={70}
            >
              Prendre un déchet en photo
            </Button>
          </Camera>
        </Flex>

        <PacifiScanFooter active="Scan" />
      </Flex>
    );
  }
}

export default Scan;
