import { FlatList, Flex, Heading, Text } from "native-base";
import { ImageBackground, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { fetchStoriesSlice } from "../src/fetchStories";
import { useNavigation } from "@react-navigation/native";

function AccueilStories() {
  const [Data, setData] = useState(null);
  const [Refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setRefreshing(true);
      const data = await fetchStoriesSlice(6);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }
  return (
    <>
      <FlatList
        flex={1}
        horizontal={true}
        data={Data}
        refreshing={Refreshing}
        onRefresh={fetchData}
        ListEmptyComponent={() => (
          <Flex flex={1} align="center" justify="center">
            <Text
              letterSpacing={-0.5}
              fontFamily="Inter_400Regular"
              fontSize={16}
            >
              Aucune histoire à afficher
            </Text>
          </Flex>
        )}
        initialNumToRender={1}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <ListItem {...item} />}
      />
    </>
  );
}

function ListItem({ title, header, id }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Story", {
          id: id,
        })
      }
    >
      <Flex
        bgColor={"black"}
        borderRadius={8}
        style={{ aspectRatio: 1 }}
        mx={1}
      >
        <ImageBackground
          style={{
            flex: 1,
            borderRadius: 8,
            backgroundColor: "black",
            overflow: "hidden",
          }}
          source={{ uri: header }}
        >
          <Flex
            p={2}
            align="center"
            justify={"center"}
            bgColor={"rgba(68, 66, 82, 0.6)"}
            borderRadius={8}
            flex={1}
          >
            <Heading
              fontWeight={"semibold"}
              textAlign={"center"}
              fontSize={14}
              color={"gray.200"}
            >
              {title}
            </Heading>
          </Flex>
        </ImageBackground>
      </Flex>
    </Pressable>
  );
}

export { ListItem };

export default AccueilStories;
