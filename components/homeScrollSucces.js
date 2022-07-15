import React from "react";
import { FlatList, Pressable, Spinner, Text } from "native-base";
import { SmallItem } from "./singleItem";
import synonyme from "../src/donnees/synonymes";
import { useNavigation } from "@react-navigation/native";

const names = Object.keys(synonyme).splice(0, 12);

export const HomeSucces = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      horizontal={true}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      ListEmptyComponent={() => <Spinner size={40} color="brand.iris80" />}
      data={names}
      renderItem={({ item, index }) => (
        <SmallItem title={item} image={synonyme[item].icone} />
      )}
      ListFooterComponent={() => (
        <Pressable
          onPress={() => {
            navigation.navigate("Infos");
          }}
          flex={1}
        >
          <Text
            fontFamily="Inter_500Medium"
            color="blueGray.500"
            letterSpacing={-0.7}
            my="auto"
          >
            Voir les autres {"\n"} déchets {">"}
          </Text>
        </Pressable>
      )}
    />
  );
};
export default HomeSucces;
