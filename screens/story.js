import { Button, Flex, Heading, Spinner, Text } from "native-base";
import { Image, View } from "react-native";
import dayjs from "dayjs";
import { PacifiScanHeader } from "../components";
import { useState, useEffect } from "react";
import { fetchOneStory } from "../src/fetchStories";
import PagerView from "react-native-pager-view";
import { logEventWithPropertiesAsync } from "expo-analytics-amplitude";
import { LargeHeading, MediumHeading } from "../components/heading";

const Story = ({ route, navigation }) => {
  const [Story, setStory] = useState(null);
  useEffect(() => {
    (async () => {
      const { id } = route.params;
      const story = await fetchOneStory(id);
      setStory(story);
      logEventWithPropertiesAsync("Story ouverte", {
        id: id,
      });
    })();
  }, []);
  if (Story === null) {
    return (
      <Flex paddingBottom={1} backgroundColor="brand.appColor" p={4} flex={1}>
        <PacifiScanHeader variant="back" />
        <Flex flex={1} align="center" justify="center">
          <Heading>Chargement de la story...</Heading>
          <Spinner marginTop={6} size={50} />
        </Flex>
      </Flex>
    );
  }

  if (Story === undefined) {
    return (
      <Flex backgroundColor="brand.appColor" paddingBottom={1} p={4} flex={1}>
        <PacifiScanHeader variant="back" />
        <Flex flex={1} align="center" justify="center">
          <Heading>Cette story n'existe pas</Heading>
          <Button marginTop={4} onPress={() => navigation.navigate("Accueil")}>
            Retourner à l'accueil
          </Button>
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex paddingBottom={1} backgroundColor="brand.appColor" p={4} flex={1}>
      <PacifiScanHeader variant="back" />
      <MediumHeading>{Story.title}</MediumHeading>
      <Text
        color="gray.500"
        fontSize={14}
        fontFamily="Inter_500Medium"
        letterSpacing={-0.5}
      >
        Publié le {dayjs(Story.publishedTime).format("DD/MM/YYYY")} dans la
        catégorie {Story.tag}
      </Text>
      <PagerView style={{ flex: 1 }} initialPage={0}>
        {Story.images.map((image, index) => (
          <View key={index} style={{ flex: 1 }}>
            <Image
              style={{
                aspectRatio: 1 / 1,
                overflow: "visible",
                resizeMode: "contain",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              source={{ uri: image }}
            ></Image>
          </View>
        ))}
      </PagerView>
    </Flex>
  );
};

export default Story;
