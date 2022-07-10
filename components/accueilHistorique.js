import { FlatList, Text, Flex, Heading, Pressable } from "native-base";
import dayjs from "dayjs";
import { Image } from "react-native";
import { getArray } from "../src/database/array";
import association from "../src/donnees/associationAnglaisFrancais";
import dechets from "../src/donnees/dechets";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

function AccueilHistorique() {
  const [Data, setData] = useState([]);

  async function refreshData() {
    const history = await getArray("NewScanned");
    setData(history.reverse().slice(0, 8));
  }
  useEffect(() => {
    refreshData();
    // Check periodically for new data
    const interval = setInterval(() => {
      refreshData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FlatList
      horizontal={true}
      ListEmptyComponent={
        <Text fontFamily="Inter_400Regular" color={"gray.500"} fontSize={13}>
          Vous n'avez pas encore scanné de déchet
        </Text>
      }
      data={Data}
      initialNumToRender={1}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => <ListItem {...item} />}
    />
  );
}

function ListItem({ date, type }) {
  const navigation = useNavigation();
  const name = association[type][0];
  const data = dechets[name];
  return (
    <Pressable
      bgColor={"brand.p45"}
      flex={1}
      mx={2}
      p={3}
      borderRadius={8}
      onPress={() => navigation.navigate("Item", { id: name })}
    >
      <Flex justify="center" align={"center"} direction="row">
        <Image
          alt={name}
          source={{ uri: data?.icone }}
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
    </Pressable>
  );
}
export default AccueilHistorique;
