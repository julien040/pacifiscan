import React from "react";
import { Flex, Button, Heading, ScrollView, Text  } from "native-base";
import {PacifiScanFooter, PacifiScanHeader} from "../components/index";
import { HomeSucces } from "../components/homeScrollSucces";

function Accueil({route, navigation }) {
    return (
        <Flex backgroundColor="brand.appColor" p={4} flex={1} justify="space-between" >
            <PacifiScanHeader/>
            <Flex flex={2} >
                <Heading color="black" marginTop={3} marginBottom={3} p={0} >Succès</Heading>
                <HomeSucces />
                <Text style={{textAlign:"right"}} width="100%" onPress={() => {navigation.navigate('Infos')}} color="brand.iris80" p={1} >Voir les succès {">"} </Text>


            </Flex>
            <Flex marginBottom={3} /* backgroundColor="brand.iris50" */ flex={3} >
            <Heading color="black" marginBottom={3} p={0} >Grâce à vous</Heading>
            <Flex borderRadius={10} p={2} flex={1} backgroundColor="brand.p45" >
                I'm someone who has been doing something for a long time.
            </Flex>
            </Flex>
            <PacifiScanFooter active="Home" />
        </Flex>
    );
    
}

export default Accueil;