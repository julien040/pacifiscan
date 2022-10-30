import { Flex, Heading, Text } from "native-base";
import { PacifiScanFooter } from "../components";
import { PacifiScanHeader } from "../components";
import { FlatList, ImageBackground, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchStories } from "../src/fetchStories";
import { SafeAreaView } from "react-native-safe-area-context";

function StoriesPage({ route, navigation }) {
  const [Stories, setStories] = useState([]);
  useEffect(() => {
    (async () => {
      const stories = await fetchStories();
      setStories(stories);
    })();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
      <Flex
        backgroundColor="brand.appColor"
        paddingBottom={1}
        p={4}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader variant="back" />
        <Heading marginBottom={4}>Stories</Heading>
        <FlatList
          horizontal={false}
          /* columnWrapperStyle={{
            justifyContent: "space-between",
          }} */
          initialNumToRender={2}
          maxToRenderPerBatch={3}
          data={Stories}
          renderItem={({ item }) => {
            return <Story {...item} />;
          }}
        />
      </Flex>
    </SafeAreaView>
  );
}

function Story({ header, id, title }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Story", {
          id: id,
        })
      }
      style={{
        aspectRatio: 1,
        /* width: "48%", */
        height: "auto",
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <Flex flex={1} bgColor={"black"} borderRadius={8} my={2}>
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
            bgColor={"rgba(68, 66, 82, 0.7)"}
            flex={1}
            p={2}
            justify="center"
            align="center"
          >
            <Text
              fontFamily="Inter_600SemiBold"
              letterSpacing={-1}
              textAlign="center"
              fontSize={22}
              color={"gray.100"}
            >
              {title}
            </Text>
          </Flex>
        </ImageBackground>
      </Flex>
    </Pressable>
  );
}

export default StoriesPage;
