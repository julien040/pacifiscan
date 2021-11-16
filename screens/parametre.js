import React, {useEffect, useState} from "react";
import { Flex, Heading, Text, Button } from "native-base";
import { PacifiScanHeader } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from 'expo-linking';


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
      <PacifiScanHeader variant="settings" />
      <Flex marginTop={4} flex={1} >
        <Heading fontSize={30} >Informations :</Heading>
        <Heading marginTop={4} color="brand.iris100" >ID de compte :</Heading>
        <Text marginTop={2} >En cas de contact avec le support, veuillez indiquer votre ID de compte : {ID}</Text>
        <Heading marginTop={4} color="brand.iris100" >Permissions de l'app :</Heading>
        <Text marginTop={2} >Nous ne pouvons malheureusement pas révoquer les permissions de l'application. Si vous n'êtes plus consentant, nous vous invitons à la désinstaller et contacter le support pour une suppression de données</Text>
      </Flex>
      <Flex justify="space-between" direction="row" >
      <Button width="48%" onPress={() => navigation.navigate("Permission")} >Permission</Button>
      <Button width="48%" borderColor="brand.primary" borderWidth={2} backgroundColor="brand.appColor" onPress={() => Linking.openURL("https://bleuclair.nc")}>En savoir plus</Button>
      </Flex>
    </Flex>
  );
}

export default Parametre;
