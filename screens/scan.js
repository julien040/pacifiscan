import React, { useState, useEffect } from "react";
import { Flex, Heading, Button, Spinner, Text } from "native-base";
import {Vibration} from 'react-native';
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import AppLoading from "expo-app-loading";
import { associationApi } from "../src/waste/waste";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import { useIsFocused } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { DetectLabel } from "../src/scan";
import { addToArray } from "../src/database/array";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {logEventAsync} from "expo-analytics-amplitude";

function Scan({ route, navigation }) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  /** @type [string|null, function]
   */
  const [LoadingContent, setLoadingContent] = useState("Chargement...");
  const [GeoPermission, setGeoPermission] = useState(null);
  const [Scanned, setScanned] = useState(false);
  const [Clicked, setClicked] = useState(false);
  var alreadyClicked = false;
  var refCamera;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status);
      let loc = await Location.requestForegroundPermissionsAsync();
      setGeoPermission(loc.status);
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
        quality: 0.1,
      });
      setClicked(true);
      setLoadingContent("Récupération de la position...");
      const { coords } = await Location.getCurrentPositionAsync({}).catch(
        (e) => {
          Toast.show("Impossible de récupérer votre position", {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: "red",
          });
        }
      );
      const { latitude, longitude } = coords;
      const id = await AsyncStorage.getItem("id")
      setLoadingContent("Envoi de l'image...");
      const label = await DetectLabel(base64, [longitude, latitude], id);
      const Item = associationApi[label];
      setLoadingContent(`Image analysée !`);
      Vibration.vibrate(100);
      logEventAsync("ScanDechet")
      await addToArray("Scanned", {
        type: label,
        coord: [latitude, longitude],
        timestamp: Date.now(),
      });
      setClicked(false);
      Toast.show(`Nous avons détecté le label : ${label}`);
      navigation.navigate("Item", { id: Item });
    } catch (error) {
      console.log(error);
      Toast.show(JSON.stringify(error), { duration: 5000 });
      setClicked(false);
    }
  }
  function handleScanned({ data }) {
    if (Scanned === false) {
      Vibration.vibrate(100);
      setScanned(true);
      navigation.push("Caddy", { id: data });
      setScanned(false);
    }
  }
  if (hasPermission === false || GeoPermission === false) {
    return (
      <Flex
        backgroundColor="brand.appColor"
        p={3}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader />
        <Heading textAlign="center">
          Nous avons besoin de la permission photo et géolocation pour scanner
          des objets
        </Heading>
        <Button
          onPress={() => {
            Camera.requestCameraPermissionsAsync();
            Location.requestForegroundPermissionsAsync();
          }}
        >
          Autoriser l'appli
        </Button>
        <PacifiScanFooter active="Scan" />
      </Flex>
    );
  } else if (
    hasPermission === null ||
    isFocused === false ||
    GeoPermission === null
  ) {
    return (
      <Flex
        backgroundColor="brand.appColor"
        p={3}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader />
        <AppLoading />
        <PacifiScanFooter />
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
            onBarCodeScanned={(scanned) => {
              handleScanned(scanned);
            }}
          >
            <Flex
              marginBottom={2}
              opacity={80}
              p={2}
              borderRadius={10}
              backgroundColor="brand.p45"
            >
              <Text>
                Pour un <Text fontWeight={700}>déchet,</Text> appuyez sur le
                bouton{" "}
              </Text>
              <Text>
                Pour un <Text fontWeight={700}>produit</Text>, mettez le code
                barre en face de la caméra
              </Text>
              <Text>
                En appuyant sur le bouton, vous acceptez que la photo soit sauvegardée sur les serveurs de PacifiScan
              </Text>
            </Flex>
            <Button
              onPress={() => HandleButton()}
              opacity={80}
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
