import React, { useRef } from "react";
import { wastesType } from "../src/waste/waste";
import { Flex, ScrollView, Heading, Text, Image, Button, FlatList } from "native-base";
import { PacifiScanHeader } from "../components/index";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import { getDistance } from 'geolib';
import * as Location from "expo-location";

/* 
    

 */
function Item({ route, navigation }) {
  const { id } = route.params; //On récupère les arguments donnés par le composant qui a appelé cette page
  /** @type {wastesType["electromenager"]}
   */
  const data = wastesType[id];
  const bottomSheetRef = useRef();
  if (!data) {
    //Dans le cas où l'api retournerait un item qui n'existe pas dans l'application
    return (
      <Flex backgroundColor="brand.appColor" p={4} flex={1}>
        <PacifiScanHeader variant="back" />
        <Heading>Cet item n'existe malheureusement pas</Heading>
      </Flex>
    );
  }
  function handleBottomSheet() {
    bottomSheetRef.current.snapToIndex(0);
  }

  return (
    <Flex
      backgroundColor="brand.pbackground"
      p={4}
      flex={1}
      justify="space-between"
    >
      <PacifiScanHeader variant="back" />
      <Heading marginTop={4} marginBottom={2}>
        {data.Header}
      </Heading>
      <ScrollView>
        <Flex align="center">
          <Image size={120} margin="auto" alt={data.nom} source={data.image} />
          <Text color="brand.iris80">{data.description} </Text>
        </Flex>
        <Flex>
          {/* Que faire début */}
          <Flex marginTop={8} marginBottom={1} direction="row">
            <Image
              marginRight={2}
              size={10}
              alt={data.nom}
              source={data.quefaireSmiley}
            />
            <Heading color="brand.iris100">Qu'en faire ?</Heading>
          </Flex>
          <Text>{data.quefaireTexte}</Text>
          {/* Que faire fin */}
          {/* Quel est son impact début */}
          <Flex marginTop={8} marginBottom={1} direction="row">
            <Image
              marginRight={2}
              size={10}
              alt={data.nom}
              source={data.impactSmiley}
            />
            <Heading color="brand.iris100">Quel est son impact ?</Heading>
          </Flex>
          <Text>{data.impactTexte}</Text>
          {/* Quel est son impact fin */}
          {/* Comment éviter ce déchet début */}
          <Flex marginTop={8} marginBottom={1} direction="row">
            <Image
              marginRight={2}
              size={10}
              alt={data.nom}
              source={data.eviterSmiley}
            />
            <Heading color="brand.iris100">Comment l'éviter ?</Heading>
          </Flex>
          <Text>{data.eviterTexte}</Text>
          {/* Comment éviter ce déchet fin */}
          <Heading color="brand.iris80" marginTop={8} fontSize={18}>
            En moyenne, cet objet pèse {data.poids} kg et met 
            {data.anneeDecomposition} ans pour se décomposer
          </Heading>
        </Flex>
        <Text
          marginTop={10}
          marginBottom={4}
          width="100%"
          textAlign="right"
          color="brand.primary"
        >
          Sources : {data.sources}
        </Text>
      </ScrollView>

      <Button onPress={handleBottomSheet}>Où jeter ?</Button>
      <BottomSheet
        backgroundStyle={{ backgroundColor: "#EFF0FF" }}
        ref={bottomSheetRef}
        snapPoints={["40%", "80%"]}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetComponent data={data} />
      </BottomSheet>
    </Flex>
  );
}

/**
 * @param  {wastesType["electromenager"]} {data}
 */
const BottomSheetComponent = ({ data }) => {
  return (
/*     <Flex p={4}>
      <Heading fontSize={28} >Où jeter {data.nom} ?</Heading>
      <Heading padding={8} m="auto" fontSize={18}>
        Il faudra rajouter une carte
      </Heading>
      <Heading marginBottom={4} color="brand.iris100" >Point de dépose :</Heading> */
      <BottomSheetFlatList
      data={data.endroit}
      renderItem={SinglePoint}
      keyExtractor={(item) => item.name}
        />
/*     </Flex> */
  );
};

const SinglePoint = ({ item }) => {
  return (
    <Flex m={3} p={4} borderRadius={10} backgroundColor="brand.p45" >
      <Heading fontSize={18}>{item.name}</Heading>
      <Text fontSize={13} >{item.description}</Text>
      <Text color="brand.iris80" fontSize={13} width="100%" textAlign="right" >Téléphone : {item.phone}</Text>
      <Text color="brand.iris80" fontSize={13} width="100%" textAlign="right" >GPS : {item.location[0]}, {item.location[1]}</Text>
    </Flex>
  )
}

export default Item;
