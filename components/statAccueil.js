import React, {useEffect, useState} from "react";
import { Flex, Text, Heading, Image } from "native-base";
import { useNavigation } from "@react-navigation/core";
import { getArray } from "../src/database/array";
import { getWeightCount, getTimeCount} from "../src/stats";

export const StatAccueil = ({}) => {
    const [Poids, setPoids] = useState(0);
    const [Temps, setTemps] = useState(0);
    useEffect(() => {
        //Voir plus bas pour l'explication de cette fonction
        (async () => {
            const data = await getArray("Scanned")
            const c = await getArray("all_caddy")
            setPoids(getWeightCount(data))
            setTemps(getTimeCount(data))
        })();
      }, []);
    const navigation = useNavigation();
    return (
        <Flex justify="space-between" wrap="wrap" flex={1} p={4} backgroundColor="brand.pbackground" borderRadius={10} > 
            <Flex direction="row" justify="space-between" >
            <Flex  align="flex-start" width="45%">
                <Image marginBottom={4} size={20} alt="Une poubelle" source={require("../assets/stats/trash.png")} />
                <Text  fontWeight={700}><Text  fontWeight={700} color="brand.iris100" >{Poids}kg de déchets</Text> ont été évités </Text>
            </Flex>
            <Flex align="flex-start" width="45%">
            <Image marginBottom={4} size={20} alt="Des déchets" source={require("../assets/stats/land.png")} />
                <Text  fontWeight={700}>Un temps cumulé de décomposition de <Text  fontWeight={700} color="brand.iris100">{Temps} ans</Text> a été évité </Text>
            </Flex>
            </Flex>
            <Heading color="brand.iris100" marginTop={4} marginBottom={2} width="100%" fontSize={18} >Si tout le monde faisait comme vous :</Heading>
            <Text fontSize={13} width="100%" >
                - 10 000T de déchets ne finiraient pas dans l'océan {"\n"}
                - 100 000 poissons ne périraient pas
            </Text>
            <Text width="100%" textAlign="right" color="brand.iris80" onPress={() => navigation.navigate("Stat")} >Voir mes stats {">"}</Text>
        </Flex>
    )
};
