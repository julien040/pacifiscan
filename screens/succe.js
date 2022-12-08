import React from "react";
import { SmallSucce } from "../components/singleItem";
import Svg, { Path } from "react-native-svg";
import dechets from "../src/donnees/dechets";
import synonyme from "../src/donnees/synonymes";
import Fuzzy from "fuse.js";
import { useState } from "react";
import {
  Flex,
  Heading,
  FlatList,
  Spinner,
  Input,
  Icon,
  Text,
  Pressable,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebouncedCallback } from "use-debounce";
import { LargeHeading } from "../components/heading";

const namesOfWastes = Object.keys(synonyme);

const toIndex = Object.keys(synonyme).map((key) => {
  return { id: key, ...synonyme[key] };
});

const fuse = new Fuzzy(toIndex, { keys: ["nom", "synonyme"] });

function Succe({ route, navigation }) {
  const [searchResult, setSearchResult] = useState([]);
  const [InputSearch, setInput] = useState("");
  const debounced = useDebouncedCallback((text) => {
    onChangeText(text);
  }, 200);

  const onChangeText = (text) => {
    setInput(text);
    const result = fuse.search(text, { limit: 15 });
    setSearchResult(
      result.map((item) => {
        return {
          nom: item.item.nom,
          fiche: item.item.fiche,
          id: item.item.id,
          icone: item.item.icone,
        };
      })
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
      <Flex
        backgroundColor="brand.appColor"
        paddingBottom={1}
        p={4}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader />
        <LargeHeading>Déchets</LargeHeading>
        <Input
          marginTop={2}
          bgColor={"brand.p45"}
          borderWidth={0}
          borderRadius={8}
          marginBottom={4}
          padding={4}
          fontFamily="Inter_600SemiBold"
          placeholderTextColor="brand.iris50"
          _input={{ letterSpacing: -0.5 }}
          placeholder="Rechercher un déchet"
          onChangeText={(e) => debounced(e)}
        />
        {InputSearch.length === 0 && (
          <FlatList
            data={namesOfWastes}
            renderItem={({ item }) => (
              <SmallSucce
                key={item}
                title={item}
                name={synonyme[item].nom}
                image={synonyme[item].icone}
              />
            )}
            ListEmptyComponent={() => <Spinner color="brand.iris80" />}
            initialNumToRender={1}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            numColumns={3}
            style={{ flex: 1 }}
          />
        )}
        {InputSearch.length > 0 && (
          <FlatList
            data={searchResult}
            renderItem={({ item: { icone, nom, id } }) => (
              <SmallSucce key={nom} title={id} name={nom} image={icone} />
            )}
            ListEmptyComponent={() => (
              <Text fontFamily="Inter_600SemiBold" color="blueGray.700">
                Aucun résultat
              </Text>
            )}
            initialNumToRender={4}
            maxToRenderPerBatch={3}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            style={{ flex: 1 }}
          />
        )}
        <PacifiScanFooter active="Info" />
      </Flex>
    </SafeAreaView>
  );
}

const SearchResultComponent = ({ nom, dechet }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      width={"49%"}
      my={1}
      borderRadius={8}
      px={3}
      p={3}
      bgColor={"brand.p45"}
      onPress={() => {
        navigation.navigate("Item", {
          id: dechet,
          synonyme: nom,
        });
      }}
    >
      <Text fontSize={15} fontFamily="Inter_600SemiBold" color="blueGray.800">
        {nom}
      </Text>
      <Text fontSize={12} fontFamily="Inter_500Medium" color="blueGray.600">
        {dechet}
      </Text>
    </Pressable>
  );
};

const SearchIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width={22}
    height={22}
    viewBox="0 0 24 24"
  >
    <Path
      stroke="#A5A6F6"
      strokeLinecap="round"
      strokeWidth={3}
      d="m21 21-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
    />
  </Svg>
);

export default Succe;
