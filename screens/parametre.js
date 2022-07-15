import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flex, Heading, Text, Button } from "native-base";
import { PacifiScanHeader } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import CommuneSelect from "../components/communeSelector";
import { MediumHeading } from "../components/heading";
import Spacer from "../components/spacer";

function Parametre({ navigation }) {
  const [ID, setID] = useState("");
  useEffect(() => {
    (async () => {
      setID(await AsyncStorage.getItem("id"));
    })();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
      <Flex
        paddingBottom={1}
        p={4}
        flex={1}
        justify="space-between"
        backgroundColor="brand.appColor"
      >
        <PacifiScanHeader variant="back" />
        <Flex marginTop={4} flex={1}>
          <MediumHeading colored>ID de compte :</MediumHeading>
          <Text fontSize={13} fontFamily="Inter_400Regular" marginTop={2}>
            En cas de contact avec le support, veuillez indiquer votre ID de
            compte : {ID}
          </Text>
          <Spacer />
          <CommuneSelect />
          <Spacer />
          <MediumHeading colored>Permissions de l'app :</MediumHeading>
          <Text
            letterSpacing={-0.5}
            fontSize={14}
            fontFamily="Inter_400Regular"
            marginTop={2}
          >
            Nous ne pouvons malheureusement pas révoquer les permissions de
            l'application. Si vous n'êtes plus consentant, nous vous invitons à
            la désinstaller et contacter le support pour une suppression de
            données
          </Text>
          <Spacer />
          <MediumHeading colored>Donnéees collectées</MediumHeading>
          <Text
            letterSpacing={-0.5}
            fontSize={14}
            fontFamily="Inter_400Regular"
            marginTop={2}
          >
            Nous ne partageons pas vos données personnelles avec des tiers.
            Cependant, nous utilisons plusieurs sous processeurs pour traiter
            ces données : Amazon Web services, Expo, OVH, Scaleway, Cloudflare,
            et Amplitude. Toutes les images des déchets scannés sont stockées
            sur nos serveurs. Si vous souhaitez supprimer ces données, envoyez
            un email à contact@pacifiscan.org
          </Text>
        </Flex>
        <Flex justify="space-between" direction="row">
          <Button
            width={"100%"}
            onPress={() => Linking.openURL("mailto:contact@pacifiscan.org")}
          >
            Nous contacter
          </Button>
        </Flex>
      </Flex>
    </SafeAreaView>
  );
}

export default Parametre;
