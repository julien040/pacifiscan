import React, { useState, useEffect } from "react";
import { Flex, Heading, Button, Spinner, Text } from "native-base";
import { Vibration } from "react-native";
import { Camera } from "expo-camera";
import { associationApi } from "../src/waste/waste";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import { useIsFocused } from "@react-navigation/native";
import { DetectLabel } from "../src/scan";
import { addToArray } from "../src/database/array";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { logEventWithPropertiesAsync } from "expo-analytics-amplitude";

function Scan({ route, navigation }) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [LoadingContent, setLoadingContent] = useState("Chargement...");
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
      // Divide by 1000 to get the value in seconds
      const beforePicture = Date.now() / 1000;
      const { base64 } = await refCamera.takePictureAsync({
        base64: true,
        exif: false,
        quality: 0.4,
      });

      const timeToTakePicture = Date.now() / 1000 - beforePicture;
      const id = await AsyncStorage.getItem("id");
      setClicked(true);
      setLoadingContent("Envoi de l'image...");
      const beforeScan = Date.now() / 1000;
      const label = await DetectLabel(base64, id);
      const timeToScan = Date.now() / 1000 - beforeScan;
      console.log(
        "Label:",
        label,
        "Time to take picture :",
        timeToTakePicture + "s",
        " Time to scan : ",
        timeToScan + "s"
      );
      const Item = associationApi[label];
      setLoadingContent(`Image analysée !`);
      Vibration.vibrate(100);
      logEventWithPropertiesAsync("Scan d'un déchet sur l'application", {
        label: label,
        timeToTakePicture,
        timeToScan,
      });
      await addToArray("Scanned", {
        type: label,
        timestamp: Date.now(),
      });
      // To check if the item is already scanned
      AsyncStorage.setItem(Item, JSON.stringify(true));
      setClicked(false);
      navigation.navigate("Item", { id: Item });
    } catch (error) {
      setClicked(false);
    }
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
      </SafeAreaView>
    );
  } else if (hasPermission === null || isFocused === false) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Flex
          backgroundColor="brand.appColor"
          p={3}
          flex={1}
          direction="column"
        >
          <PacifiScanHeader />
          <Flex justify="center" align={"center"} flex={1}>
            <Spinner size={80} color="brand.iris80" />
            <Heading marginTop={6}>Chargement de la caméra...</Heading>
          </Flex>

          <PacifiScanFooter active="Scan" />
        </Flex>
      </SafeAreaView>
    );
  } else if (Clicked) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Flex backgroundColor="brand.appColor" p={3} flex={1}>
          <PacifiScanHeader />
          <Flex flex={1} justify="center" align="center">
            <Heading color="brand.iris100" textAlign="center">
              {LoadingContent}
            </Heading>

            <Spinner marginTop={4} size={60} />
            <Text
              maxWidth={"80%"}
              marginTop={8}
              textAlign="center"
              fontSize={14}
              fontFamily="Inter_500Medium"
              color="gray.500"
            >
              L'application est en phase de test. La reconnaissance de déchet
              est plus que perfectible
            </Text>
          </Flex>

          <PacifiScanFooter active="Scan" />
        </Flex>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
      </SafeAreaView>
    );
  }
}

export default Scan;
