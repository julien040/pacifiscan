import React, { useState, useEffect } from "react";
import { Text, Pressable, Flex, FlatList, Heading, Image } from "native-base";
import { PacifiScanHeader, PacifiScanFooter } from "../components";
import PagerView from "react-native-pager-view";
import { getArray } from "../src/database/array";
import { getWeightCount, getTimeCount } from "../src/stats";
import { associationApi, wastesType } from "../src/waste/waste";
import dayjs from "dayjs";

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
    const data = await getArray("Scanned");
    setData(data.reverse());
    setisRefreshing(false);
    const weight = getWeightCount(data);
    const time = getTimeCount(data);
    const length = data.length;
    setStats([weight, time, length]);
  }
  return (
    <Flex
      flex={1}
      backgroundColor="brand.appColor"
      p={4}
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
            {Stats[0]} kg
          </Heading>
          <Text
            fontFamily="Inter_400Regular"
            textAlign={"center"}
            fontSize={12}
            color={"gray.500"}
          >
            Poids total cumulé
          </Text>
        </Flex>
        <Flex flex={1}>
          <Heading textAlign={"center"} fontSize={20}>
            {Stats[1]}
            {Stats[1] > 1 ? " ans" : " an"}
          </Heading>
          <Text
            fontFamily="Inter_400Regular"
            textAlign={"center"}
            fontSize={12}
            color={"gray.500"}
          >
            Temps cumulé
          </Text>
        </Flex>
        <Flex flex={1}>
          <Heading textAlign={"center"} fontSize={20}>
            {Stats[2]}
          </Heading>
          <Text
            fontFamily="Inter_400Regular"
            textAlign={"center"}
            fontSize={12}
            color={"gray.500"}
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
            <Text color={"gray.500"} fontSize={15} fontFamily="Inter">
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
    <Pressable
      onPress={() =>
        navigation.navigate("Item", { id: associationApi[item.type] })
      }
    >
      <Flex
        direction="row"
        borderRadius={10}
        p={3}
        backgroundColor="brand.pbackground"
        m={1}
        flex={1}
      >
        <Image
          marginRight={2}
          alt={item.type}
          source={{ uri: wastesType[associationApi[item.type]].image }}
          width={10}
          height={10}
        />
        <Text fontFamily="Inter" flex={1}>
          Vous avez scanné{" "}
          <Text fontWeight={"700"} color="brand.iris80">
            {associationApi[item.type]}
          </Text>
          {" le "}
          {dayjs(item.timestamp).format("DD/MM/YYYY à hh:mm")} UTC
        </Text>
      </Flex>
    </Pressable>
  );
};

export default Historique;
