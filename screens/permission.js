import React, { useState, useEffect } from "react";
import { requestCameraPermissionsAsync } from "expo-camera";
import AppLoading from "expo-app-loading";
import {
  Flex,
  Heading,
  Button,
  View,
  Text,
  Checkbox,
  ScrollView,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Permission({}) {
  const [Location, setLocation] = useState(null);
  const [firstTime, setFirstTime] = useState(null);
  const [Camera, setCamera] = useState(null);
  async function askCamera() {
    let cam = await requestCameraPermissionsAsync();
    setCamera(cam.status);
  }
  useEffect(() => {
    (async () => {
      let id = await AsyncStorage.getItem("id");
      if (id == null) {
        setFirstTime(true);
        AsyncStorage.setItem("id", Math.random().toString(36).substring(7));
      } else {
        /* navigation.navigate("Accueil"); */
      }
    })();
  }, []);
  switch (true) {
    case null:
      return <AppLoading />;
    case false:
      return <AppLoading />;
    case true:
      return (
        <Flex flex={1} backgroundColor={"brand.appColor"}>
          <Text>Aoo</Text>
        </Flex>
      );

    default:
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Text>
            Une erreur est survenue, veuillez réessayer ultérieurement.
          </Text>
        </SafeAreaView>
      );
      break;
  }
}

export default Permission;
