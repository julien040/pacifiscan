import { FlatList, Text, Flex, Heading } from "native-base";
import { ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import { WebView } from "react-native-webview";

/* 
Story example : {
    id: 1,
    title:"Acidification",
    date:"2020-04-12T00:00:00.000Z",
    image:"https://stories.pacifiscan.org/images/stories/acidification.jpg",
}
*/

const fakeData = [
  {
    id: 1,
    title: "Acidification de l'eau",
    date: "2020-04-12T00:00:00.000Z",
    image: "https://picsum.photos/id/440/1080/1920",
  },
  {
    title: "Ramassage de déchets",
    date: "2020-08-12T00:00:00.000Z",
    image: "https://picsum.photos/id/450/1080/1920",
    url: "https://stories.pacifiscan.org/2/",
  },
  {
    title: "Le developpement durable au lycée",
    date: "2020-12-12T00:00:00.000Z",
    image: "https://picsum.photos/id/451/1080/1920",
    url: "https://stories.pacifiscan.org/3/",
  },
  {
    title: "Découverte du compost",
    date: "2021-04-12T00:00:00.000Z",
    image: "https://picsum.photos/id/560/1080/1920",
    url: "https://stories.pacifiscan.org/4/",
  },
];

function AccueilStories() {
  const [Data, setData] = useState(fakeData);

  return (
    <>
      <FlatList
        flex={1}
        horizontal={true}
        data={Data}
        initialNumToRender={1}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <ListItem {...item} />}
      />
    </>
  );
}

function ListItem({ url, title, date, image }) {
  return (
    <Flex
      bgColor={"black"}
      borderRadius={8}
      style={{ aspectRatio: 9 / 16 }}
      mx={1}
    >
      <ImageBackground
        style={{
          aspectRatio: 9 / 16,
          flex: 1,
          borderRadius: 8,
          backgroundColor: "black",
          overflow: "hidden",
        }}
        source={{ uri: image }}
      >
        <Flex
          p={2}
          align="center"
          justify={"center"}
          bgColor={"gray.800"}
          opacity={0.75}
          borderRadius={8}
          flex={1}
        >
          <Heading
            fontWeight={"semibold"}
            textAlign={"center"}
            fontSize={16}
            color={"white"}
          >
            {title}
          </Heading>
        </Flex>
      </ImageBackground>
    </Flex>
  );
}
export default AccueilStories;
