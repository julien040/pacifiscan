import React, { useState, useEffect } from "react";
import { requestForegroundPermissionsAsync } from "expo-location";
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
import * as Random from 'expo-random';

function Permission({ navigation }) {
  const [Location, setLocation] = useState(null);
  const [Camera, setCamera] = useState(null);
  async function askCamera() {
    let cam = await requestCameraPermissionsAsync();
    setCamera(cam.status);
  }
  async function askLocation() {
    const { status } = await requestForegroundPermissionsAsync();
    setLocation(status);
  }
  useEffect(() => {
    (async () => {
      await askCamera();
      await askLocation();
      let id = await AsyncStorage.getItem("id");
      if (id == null) {
        AsyncStorage.setItem("id", Math.random().toString(36).substring(7));
      }
    })();
  }, []);

  useEffect(() => {
    if (Location === "granted" && Camera === "granted") {
      navigation.navigate("Accueil");
      
    }
  }, [Location, Camera]);

  if (Location === null || Camera === null) {
    return <AppLoading />;
     } else if (Location === "granted" && Camera === "granted") {
      navigation.navigate("Accueil");
      return <AppLoading />;
  } else if (Location === "denied" || Camera === "denied") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Flex p={3} justify="space-between" flex={1}>
          <View>
            <Heading fontSize={36} color="brand.logo">
              Pacifiscan
            </Heading>
            <Heading fontSize={20} marginTop={2}>
              Vous devez autoriser l'accès à votre position et à votre caméra
              pour pouvoir utiliser l'application
            </Heading>
          </View>
          <ScrollView marginTop={2} flex={1}>
            <Text fontWeight={700} color="brand.iris100" fontSize={16}>
              {Camera === "granted"
                ? "Vous avez accepté la permission photo"
                : "Vous avez refusé la permission photo"}
            </Text>
            <Text fontWeight={700} color="brand.iris100" fontSize={16}>
              {Location === "granted"
                ? "Vous avez accepté la permission géolocalisation"
                : "Vous avez refusé la permission géolocalisation"}
            </Text>
            <Text>
              Ces autorisations sont nécessaires à l'application. Vous pouvez à
              tout moment faire une demande pour supprimer ces données de nos
              serveurs. {"\n\n"}
              Nous tenons à rappeler que vos données sont anonymes et ne seront
              jamais partagées à des tiers à des fins commerciales.Elles sont
              mélangées aux données de tous les utilisateurs et il nous est
              impossible d'identifier précisément un utilisateur{"\n"}
              Vos images sont conservées pendant une durée de trois ans maximum
              et servent à entraîner des algorithmes de recherche.{"\n\n"}
              Les données de géolocalisation sont conservées pendant une durée
              de trois ans maximum et servent à créer des cartes de suivi des
              déchets.{"\n\n"}
              Si vous refusez ces autorisations, vous ne pourrez pas utiliser
              l'application. Nous comprenons votre décision et nous vous
              invitons à la désinstaller.{"\n\n"}
              Les données concernant votre historique de scan et de produits
              scannés reste sur votre appareil. {"\n\n"}
              Les données de géolocalisation et les images sont enregistrées par le sous processeur AWS sur des serveurs situés à Sydney. 
              Ces dernières transitent par des serveurs de Vultr (Constant Company), de MongoDb Inc et de Cloudflare Inc. {"\n\n"}
              Pour plus d'informations, rendez-vous sur notre site web ou
              contactez-nous par mail.
            </Text>
          </ScrollView>
{/*           <Checkbox onChange={(i) => {AsyncStorage.setItem("collectData", JSON.stringify(i))}} >
            J'accepte la collection anonyme de statistiques d'utilisation
          </Checkbox> */}
          <Flex direction="row" justify="space-between">
            <Button onPress={askCamera} width="45%">Appareil photo</Button>
            <Button onPress={askLocation} width="45%">Géolocalisation</Button>
          </Flex>
        </Flex>
      </SafeAreaView>
    );
  } else {
    return null;
  }
}

export default Permission;
