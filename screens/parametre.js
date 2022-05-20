import React, { useEffect, useState } from "react";
import { Flex, Heading, Text, Button } from "native-base";
import { PacifiScanHeader } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

function Parametre({ navigation }) {
  const [ID, setID] = useState("");
  useEffect(() => {
    (async () => {
      setID(await AsyncStorage.getItem("id"));
    })();
  }, []);
  return (
    <Flex
      p={3}
      flex={1}
      justify="space-between"
      backgroundColor="brand.appColor"
    >
      <PacifiScanHeader variant="back" />
      <Flex marginTop={4} flex={1}>
        <Heading marginTop={4} color="brand.iris100">
          ID de compte :
        </Heading>
        <Text fontFamily="Inter" marginTop={2}>
          En cas de contact avec le support, veuillez indiquer votre ID de
          compte : {ID}
        </Text>
        <Heading marginTop={4} color="brand.iris100">
          Permissions de l'app :
        </Heading>
        <Text fontFamily="Inter" marginTop={2}>
          Nous ne pouvons malheureusement pas révoquer les permissions de
          l'application. Si vous n'êtes plus consentant, nous vous invitons à la
          désinstaller et contacter le support pour une suppression de données
        </Text>
        <Heading marginTop={4} color="brand.iris100">
          Donnéees collectées
        </Heading>
        <Text fontFamily="Inter" marginTop={2}>
          Nous ne partageons pas vos données personnelles avec des tiers.
          Cependant, nous utilisons plusieurs sous processeurs pour traiter ces
          données : Amazon Web services, Expo, OVH, Scaleway, Cloudflare, et
          Amplitude. Toutes les images des déchets scannés sont stockées sur nos
          serveurs. Si vous souhaitez supprimer ces données, envoyez un email à
          contact@pacifiscan.org
        </Text>
      </Flex>
      <Flex justify="space-between" direction="row">
        <Button
          width={"100%"}
          onPress={() => Linking.openURL("https://pacifiscan.org")}
        >
          Visiter notre site
        </Button>
      </Flex>
    </Flex>
  );
}

export default Parametre;
