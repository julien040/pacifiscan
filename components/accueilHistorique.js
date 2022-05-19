import { FlatList, Text, Flex, Heading } from "native-base";
import dayjs from "dayjs";
import { Image } from "react-native";
import { getArray } from "../src/database/array";
import { associationApi, wastesType } from "../src/waste/waste";
import { useState, useEffect } from "react";

function AccueilHistorique() {
  const [Data, setData] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);

  async function refreshData() {
    setRefreshing(true);
    const history = await getArray("Scanned");
    setData(history.reverse().slice(0, 8));
    setRefreshing(false);
  }
  useEffect(() => {
    (async () => {
      await refreshData();
    })();
  }, []);

  return (
    <FlatList
      horizontal={true}
      ListEmptyComponent={
        <Text fontFamily="Inter" color={"gray.500"} fontSize={13}>
          Vous n'avez pas encore scanné de déchet
        </Text>
      }
      refreshing={Refreshing}
      onRefresh={refreshData}
      data={Data}
      initialNumToRender={1}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => (
        <ListItem date={item.timestamp} type={item.type} />
      )}
    />
  );
}

function ListItem({ date, type }) {
  const name = associationApi[type];
  const data = wastesType[name];
  return (
    <Flex
      flex={1}
      mx={2}
      p={3}
      borderRadius={8}
      justify="center"
      align={"center"}
      bgColor={"brand.p45"}
      direction="row"
    >
      <Image
        alt={name}
        source={{ uri: data.image }}
        style={{ width: 48, height: 48, marginRight: 8 }}
      />
      <Flex>
        <Heading color={"gray.800"} fontSize={16}>
          {name}
        </Heading>
        <Text color={"gray.500"} fontSize={11}>
          {dayjs(date).format("DD/MM/YYYY")}
        </Text>
      </Flex>
    </Flex>
  );
}
export default AccueilHistorique;
