import { FlatList, Text, Flex, Heading, Pressable } from "native-base";
import dayjs from "dayjs";
import { Image } from "react-native";
import { getArray } from "../src/database/array";
import association from "../src/donnees/associationAnglaisFrancais";
import dechets from "../src/donnees/dechets";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { SimpleSubTitle600 } from "./text";
import synonymes from "../src/donnees/synonymes";

function AccueilHistorique() {
  const [Data, setData] = useState([]);
  const navigation = useNavigation();

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
        <Text
          letterSpacing={-0.5}
          fontFamily="Inter_400Regular"
          color={"gray.500"}
          fontSize={13}
        >
          Vous n'avez pas encore scanné de déchet
        </Text>
      }
      data={Data}
      initialNumToRender={1}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => <ListItem {...item} />}
      ListFooterComponent={() =>
        Data.length > 4 ? (
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
              Voir l'historique {">"}
            </Text>
          </Pressable>
        ) : null
      }
    />
  );
}

function ListItem({ date, type }) {
  const name = association[type]?.nom;
  const data = synonymes[name];
  return (
    <Pressable
      bgColor={"brand.p45"}
      flex={1}
      mx={2}
      p={3}
      px={5}
      borderRadius={8}
    >
      <Flex justify="center" align={"center"} direction="row">
        <Flex>
          <SimpleSubTitle600>{name}</SimpleSubTitle600>

          <Text letterSpacing={-0.5} color={"gray.500"} fontSize={12}>
            {dayjs(date).format("DD/MM/YYYY")}
          </Text>
        </Flex>
      </Flex>
    </Pressable>
  );
}
export default AccueilHistorique;
