import React, { useState, useEffect, useRef } from "react";
import { Flex, Heading, Button, Spinner, Text, useToast } from "native-base";
import { Vibration, View } from "react-native";
import { Camera } from "expo-camera";
import association from "../src/donnees/associationAnglaisFrancais";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import { useIsFocused } from "@react-navigation/native";
import { DetectLabel } from "../src/scan";
import { addToArray } from "../src/database/array";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { logEventWithPropertiesAsync } from "expo-analytics-amplitude";
import Toast from "react-native-toast-message";

function Scan({ route, navigation }) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [CanAskAgain, setCanAskAgain] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [LoadingContent, setLoadingContent] = useState("Chargement...");
  const [Clicked, setClicked] = useState(false);
  var refCamera = useRef(null);

  async function askPermission() {
    const { status, canAskAgain } =
      await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    setCanAskAgain(canAskAgain);
  }
  useEffect(() => {
    (async () => {
      await askPermission();
    })();
  }, []);
  async function HandleButton() {
    if (Clicked) {
      return;
    } else {
      setClicked(true);
    }
    try {
      // Divide by 1000 to get the value in seconds
      const beforePicture = Date.now() / 1000;
      const { base64 } = await refCamera.takePictureAsync({
        base64: true,
        exif: false,
        quality: 0.4,
      });
      const timeToTakePicture = (Date.now() / 1000 - beforePicture).toFixed(2);
      const id = await AsyncStorage.getItem("id");
      setLoading(true);

      setLoadingContent("Envoi de l'image...");
      const beforeScan = Date.now() / 1000;
      const { label, uuid, confidence } = await DetectLabel(base64, id);
      const timeToScan = (Date.now() / 1000 - beforeScan).toFixed(2);
      const Item = association[label];
      setLoadingContent(`Image analysée !`);
      Vibration.vibrate(100);
      logEventWithPropertiesAsync("Scan d'un déchet sur l'application", {
        label: label,
        timeToTakePicture,
        timeToScan,
        confidence,
      });
      await addToArray("NewScanned", {
        type: label,
        timestamp: Date.now(),
        uuid: uuid,
      });
      // Cas où il n'y a pas besoin de sélection
      if (Array.isArray(Item) && Item.length === 1) {
        navigation.navigate("Item", {
          id: Item[0],
        });
      } else {
        navigation.navigate("ScanSelecteur", {
          label: label,
          uuid: uuid,
          confidence: confidence,
        });
      }
    } catch (error) {
      // Display a different error message following if it's a network issue or not
      let title = "Une erreur est survenue";
      let message = "Veuillez réessayer ultérieurement";
      // Because throw can throw anything, we check if it's an error
      if (error instanceof Error) {
        // Case when the error was catched in scan.js
        if (error.message == "Erreur lors de la requête") {
          title = "Impossible de contacter le serveur";
          message = "Vérifiez votre connexion internet";
        }
      }
      console.error(error);
      Toast.show({
        type: "error",
        text1: title,
        text2: message,
        position: "top",
        visibilityTime: 12000,
        hideOnPress: true,
      });
    } finally {
      setLoading(false);
      setClicked(false);
    }
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
        <Flex
          justify={"space-between"}
          backgroundColor="brand.appColor"
          p={4}
          flex={1}
        >
          <PacifiScanHeader />
          <View>
            <Heading fontSize={22} paddingTop={4}>
              Nous avons besoin d'accéder à la caméra pour scanner votre déchet.
            </Heading>
            {
              // If we can still ask for permission
              CanAskAgain && (
                <Button marginTop={4} onPress={askPermission}>
                  Autoriser l'appli
                </Button>
              )
            }
            {
              // If we can't ask for permission anymore
              !CanAskAgain && (
                <Text marginTop={4} fontFamily="Inter_500Medium">
                  Pour autoriser l'accès à la caméra, allez dans les paramètres
                  de votre appareil. Ensuite, selectionnez Pacifiscan dans les
                  applications et accordez l'accès à la caméra.
                </Text>
              )
            }
          </View>
          <PacifiScanFooter active="Scan" />
        </Flex>
      </SafeAreaView>
    );
  } else if (hasPermission === null || isFocused === false) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
        <Flex
          backgroundColor="brand.appColor"
          paddingBottom={1}
          p={4}
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
  } else if (Loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
        <Flex backgroundColor="brand.appColor" paddingBottom={1} p={4} flex={1}>
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
              La reconnaissance de déchet n'est pas toujours exacte.
              Excusez-nous de la gêne occasionnée.
            </Text>
          </Flex>

          <PacifiScanFooter active="Scan" />
        </Flex>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
        <Flex
          backgroundColor="brand.appColor"
          paddingBottom={1}
          p={4}
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
                {Clicked ? "Chargement..." : "Prendre un déchet en photo"}
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
