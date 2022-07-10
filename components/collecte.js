import {
  Flex,
  Heading,
  Spinner,
  Text,
  Image,
  Button,
  Pressable,
} from "native-base";
import { openURL } from "expo-linking";
import { useEffect, useState } from "react";
import { getCollecte, getCommune } from "../src/getCollecte";
import communes from "../src/donnees/communes";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native";

function Collecte({ id }) {
  const [pointCollecte, setPointCollecte] = useState(null);
  const [Commune, setCommune] = useState();
  useEffect(() => {
    (async () => {
      const point = await getCollecte(id);
      setPointCollecte(point);
      const commune = await getCommune();
      setCommune(commune);
    })();
  }, []);
  if (pointCollecte === null) {
    return (
      <Flex>
        <Spinner size={50} color="brand.primary" my={"auto"} />
      </Flex>
    );
  }
  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <Text
          marginBottom={2}
          fontFamily="Inter_500Medium"
          fontSize={14}
          color="blueGray.500"
        >
          {Commune === null
            ? "Aucune commune n'est sélectionnée."
            : "Votre commune : " + communes[Commune]?.nom}
        </Text>
      }
      data={pointCollecte}
      renderItem={({ item }) => (
        <ItemCollecteComponent
          nom={item.nom}
          description={item.description}
          enSavoirPlus={item.enSavoirPlus}
          icone={item.icone}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      style={{ paddingLeft: 12, paddingRight: 12 }}
      ListFooterComponent={
        <Text
          my={2}
          fontFamily="Inter_500Medium"
          fontSize={14}
          color="blueGray.500"
        >
          Cliquez sur un point pour en savoir plus
        </Text>
      }
    />
  );
}
const ItemCollecteComponent = ({ nom, description, icone, enSavoirPlus }) => {
  function handlePress() {
    openURL(enSavoirPlus);
  }
  return (
    <Pressable
      px={2}
      py={4}
      borderRadius={8}
      bgColor={"brand.pbackground"}
      my={2}
      onPress={handlePress}
    >
      <Flex direction="row" align="center">
        <Image height={12} width={12} alt={nom} source={{ uri: icone }} />
        <Flex marginLeft={2} flex={1}>
          <Heading fontFamily="Inter_600SemiBold" fontSize={15}>
            {nom}
          </Heading>
          <Text
            fontSize={13}
            color="blueGray.600"
            marginTop={1}
            fontFamily="Inter_400Regular"
          >
            {description}
          </Text>
        </Flex>
      </Flex>
    </Pressable>
  );
};

export default Collecte;
