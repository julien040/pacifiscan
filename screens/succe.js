import React from "react";
import { SmallSucce } from "../components/singleItem";
import dechets from "../src/donnees/dechets";
import { Flex, Heading, FlatList, Spinner } from "native-base";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import { SafeAreaView } from "react-native-safe-area-context";

const namesOfWastes = Object.keys(dechets);

function Succe({ route, navigation }) {
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
        <Heading marginTop={2} marginBottom={2}>
          Déchets
        </Heading>
        <FlatList
          data={namesOfWastes}
          renderItem={({ item }) => (
            <SmallSucce
              key={item}
              title={item}
              navigation={navigation}
              image={dechets[item].icone}
            />
          )}
          ListEmptyComponent={() => <Spinner color="brand.iris80" />}
          initialNumToRender={1}
          maxToRenderPerBatch={3}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={2}
        />
        <PacifiScanFooter active="Info" />
      </Flex>
    </SafeAreaView>
  );
}

export default Succe;
