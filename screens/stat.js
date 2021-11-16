import { View, Button, Flex, Heading, Text } from "native-base";
import React, {useState, useEffect} from "react";
import { Share } from "react-native";
import { PacifiScanHeader, PacifiScanFooter } from "../components";
import { getCaddyCount, getCountCo2, differentTypeDiscovered, getTimeCount, getWeightCount, mostScannedType } from "../src/stats";
import { getArray } from "../src/database/array";
import { associationApi } from "../src/waste/waste";

function Stat() {
    const [Data, setData] = useState(["","", "", "", "", ""]);
    useEffect(() => {
        (async () => {
            const data = await getArray("Scanned")
            const c = await getArray("all_caddy")
            let array = [getCaddyCount(c), getCountCo2(c), differentTypeDiscovered(data), getTimeCount(data), getWeightCount(data), mostScannedType(data)];
            setData(array);
        })();
      }, []);
  return (
    <Flex
      backgroundColor="brand.appColor"
      p={3}
      flex={1}
      justify="space-between"
    >
      <PacifiScanHeader variant="back" />
      <Flex direction="row" align="center" justify="space-between" wrap="wrap" flex={1}>
        <Heading width="100%" marginTop={4} marginBottom={2} >Statistiques</Heading>
        <SingleItem data={Data[0]} text="Nombre de caddy enregistré" />
        <SingleItem data={Data[1] + " kg"} text="CO2 total de vos courses" />
        <SingleItem data={Data[2]} text="Déchets différents trouvés" />
        <SingleItem data={Data[3] + " ans"} text="Temps de décomposition cumulé" />
        <SingleItem data={Data[4] + " kg"} text="Poids cumulé des déchets" />
        <SingleItem smaller data={associationApi[Data[5]]} text="Type de déchets le plus scanné" />

      </Flex>
      <Text onPress={() => {Share.share({message:`Grâce à l'application Pacifiscan, j'ai ramassé ${Data[4]} kg de déchets`})}} textAlign="right" color="brand.iris80" >Partager mes stats {">"}</Text>
    </Flex>
  );
}

export default Stat;


const SingleItem = ({data, text, smaller}) => {
    return (
        <Flex marginBottom={4} backgroundColor="brand.pbackground" borderRadius={10} p={2} paddingBottom={6} align="center" width="49%">
            <Heading fontSize={smaller ? 16 : 26} marginTop={2} >{data}</Heading>
            <Text marginTop={2} color="brand.iris80">{text}</Text>
        </Flex>
    )
}