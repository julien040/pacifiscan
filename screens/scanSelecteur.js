import { Text, Flex, Heading, Pressable } from "native-base";
import { FlatList, Image } from "react-native";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import Dechet from "../src/donnees/dechets";

import { SafeAreaView } from "react-native-safe-area-context";
import association from "../src/donnees/associationAnglaisFrancais";
import { useNavigation } from "@react-navigation/native";

function ScanSelecteur({ route, navigation }) {
  const { label, uuid, confidence } = route.params;
  /** @type {Dechet["Vélo"]}
   */
  const Item = association[label];
  if (Item === undefined) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
        <Flex
          justify={"space-between"}
          backgroundColor="brand.appColor"
          p={4}
          flex={1}
        >
          <Text>Cet objet est inconnu</Text>
        </Flex>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex
        justify={"space-between"}
        backgroundColor="brand.appColor"
        p={4}
        flex={1}
      >
        <PacifiScanHeader variant="back" />
        <Flex flex={1}>
          <Heading fontSize={22} marginTop={4}>
            Quel est la catégorie du déchet ?
          </Heading>
          <Text
            marginTop={1}
            color={"gray.500"}
            fontFamily="Inter_600SemiBold"
            fontSize={14}
          >
            Nous sommes sûrs du résultat à {confidence.toFixed(3) * 100} % !
          </Text>
          <FlatList
            initialNumToRender={2}
            style={{ marginTop: 16 }}
            data={Item}
            renderItem={({ item }) => {
              const { nom, icone } = Dechet[item];
              return <SelectionItem nom={nom} icone={icone} />;
            }}
            keyExtractor={(item) => item}
          />
        </Flex>
      </Flex>
    </SafeAreaView>
  );
}

const SelectionItem = ({ nom, icone }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Item", { id: nom });
      }}
      my={2}
      borderRadius={8}
      py={2}
      px={2}
      bgColor={"brand.p45"}
    >
      <Flex direction="row" align={"center"}>
        <Image source={{ uri: icone }} style={{ width: 50, height: 50 }} />
        <Text fontFamily="Inter_600SemiBold" fontSize={14} marginLeft={2}>
          {nom}
        </Text>
      </Flex>
    </Pressable>
  );
};

export default ScanSelecteur;
