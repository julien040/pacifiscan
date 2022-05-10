import React, { useRef } from "react";
import { wastesType } from "../src/waste/waste";
import { Flex, ScrollView, Heading, Text, Image, Button } from "native-base";
import { PacifiScanHeader } from "../components/index";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import * as Linking from "expo-linking";
/* 
    

 */
function Item({ route, navigation }) {
  const { id } = route.params; //On récupère les arguments donnés par le composant qui a appelé cette page
  /** @type {wastesType["Ampoule"]}
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
      <ScrollView scrollEnabled={false}>
        <Flex align="center">
          <Image size={120} margin="auto" alt="L'image" source={data.image} />
          <Text color="brand.iris80">{data.description} </Text>
        </Flex>
        <Flex>
          {/* Que faire début */}
          <Flex marginTop={8} marginBottom={1} direction="row">
            <Image
              marginRight={2}
              size={10}
              alt={id}
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
              alt="A smiley"
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
              alt="A smiley"
              source={data.eviterSmiley}
            />
            <Heading color="brand.iris100">Comment l'éviter ?</Heading>
          </Flex>
          <Text>{data.eviterTexte}</Text>
          {/* Comment éviter ce déchet fin */}
          <Heading color="brand.iris80" marginTop={8} fontSize={18}>
            En moyenne, cet objet pèse {data.poids} kg et met{" "}
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
      {/* 
      <Button onPress={handleBottomSheet}>Où jeter ?</Button>
      <BottomSheet
        backgroundStyle={{ backgroundColor: "#EFF0FF" }}
        ref={bottomSheetRef}
        snapPoints={["60%"]}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetComponent data={data} />
      </BottomSheet> */}
    </Flex>
  );
}

/**
 * @param  {wastesType["electromenager"]} {data}
 */
const BottomSheetComponent = ({ data }) => {
  return (
    <BottomSheetFlatList
      data={data.endroit}
      renderItem={SinglePoint}
      keyExtractor={(item) => item.name}
    />
  );
};
import { points } from "../src/waste/waste";
const SinglePoint = ({ item }) => {
  item = points[item];
  return (
    <Flex marginTop={4} p={4} borderRadius={10} backgroundColor="brand.p45">
      <Heading fontSize={18}>{item.name || null}</Heading>
      <Text fontSize={13}>{item.description || null}</Text>
      <Flex marginTop={4} align="center" width="100%" direction="row">
        <Text
          onPress={() => {
            Linking.openURL(`tel:${item.phone}`);
          }}
          flex={1}
          color="brand.iris80"
          fontSize={13}
          width="100%"
          textAlign="right"
        >
          Téléphone : {item.phone || "Inconnu"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Item;
