import React, { useState, useEffect } from "react";
import { Text, Pressable, Flex, FlatList, Heading, Image } from "native-base";
import { PacifiScanHeader } from "../components";
import { getArray } from "../src/database/array";
import association from "../src/donnees/associationAnglaisFrancais";
import dechets from "../src/donnees/dechets";
import dayjs from "dayjs";
import synonymes from "../src/donnees/synonymes";
import associationAnglaisFrancais from "../src/donnees/associationAnglaisFrancais";

function Historique({ navigation }) {
  const [Data, setData] = useState([]);
  const [Stats, setStats] = useState([null, null, null]); // Each index corresponds to a stat
  useEffect(() => {
    (async () => {
      await refreshData();
    })();
  }, []);

  const [isRefreshing, setisRefreshing] = useState(false);

  async function refreshData() {
    const data = await getArray("NewScanned");
    setData(data.reverse());
    setisRefreshing(false);
    const length = data.length;
    setStats(length);
  }
  return (
    <Flex
      flex={1}
      backgroundColor="brand.appColor"
      p={4}
      paddingBottom={1}
      justify="space-between"
    >
      <PacifiScanHeader variant="back" />
      <Heading marginTop={2}>Historique</Heading>
      <Flex
        marginTop={2}
        borderRadius={10}
        justify={"space-between"}
        p={4}
        bgColor={"brand.pbackground"}
        direction="row"
      >
        <Flex flex={1}>
          <Heading textAlign={"center"} fontSize={20}>
            {Stats}
          </Heading>
          <Text
            fontFamily="Inter_400Regular"
            textAlign={"center"}
            fontSize={12}
            color={"gray.500"}
            letterSpacing={-0.5}
          >
            Nombre de scan
          </Text>
        </Flex>
      </Flex>

      <FlatList
        marginTop={2}
        flex={1}
        data={Data}
        initialNumToRender={10}
        ListEmptyComponent={
          <Flex mt={4} flex={1} align="center" justify={"center"}>
            <Text
              color={"gray.500"}
              fontSize={15}
              fontFamily="Inter_400Regular"
            >
              Vous n'avez pas encore scanné de déchet
            </Text>
          </Flex>
        }
        refreshing={isRefreshing}
        onRefresh={async () => {
          await refreshData();
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Item
            navigation={navigation}
            refresh={refreshData}
            item={item}
            index={index}
          />
        )}
      />
    </Flex>
  );
}

const Item = ({ item, index, refresh, navigation }) => {
  return (
    <Pressable>
      <Flex
        direction="row"
        borderRadius={10}
        p={4}
        backgroundColor="brand.pbackground"
        m={1}
        flex={1}
      >
        <Text letterSpacing={-0.5} fontFamily="Inter_400Regular" flex={1}>
          Vous avez scanné{" "}
          <Text fontWeight={"700"} color="brand.iris80">
            {associationAnglaisFrancais[item.type]?.nom}
          </Text>
          {" le "}
          {dayjs(item.timestamp).format("DD/MM/YYYY à hh:mm")} UTC
        </Text>
      </Flex>
    </Pressable>
  );
};

export default Historique;
