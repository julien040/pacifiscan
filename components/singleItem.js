import React from "react";
import { Flex, Image, Text, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/core";
import { SimpleSubTitle600 } from "./text";
/* 
    Small Item Component
    
    Il prend en argument plusieurs propriétés :
     - image : l'image de l'item sous forme d'URL ou de chemin avec require
     - isBlocked : si l'item est débloqué ou non (true ou false)
     - title : le titre de l'item (string)
     - description : la description de l'item (string)

    Small Succes Component
    
    Identique à en haut sauf qu'il est sur la page succès
 */
export const SmallItem = (props) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Item", { id: props.title })}
      maxHeight={170}
      minWidth={120}
      marginRight={2}
      marginLeft={2}
    >
      <Flex
        borderRadius={10}
        backgroundColor={props.isBlocked ? "brand.pbackground" : "brand.p45"}
        p={3}
      >
        <Image
          width="56px"
          height="56px"
          alt={"Une image de " + props.title}
          source={{ uri: props.image }}
          marginBottom={2}
        />
        <SimpleSubTitle600>{props.title}</SimpleSubTitle600>
      </Flex>
    </Pressable>
  );
};

export const Item = (props) => {
  const navigation = useNavigation();
  return (
    <Pressable
      width="32%"
      borderRadius={10}
      p={3}
      backgroundColor={"brand.p45"}
      my={1}
      onPress={() => navigation.navigate("Item", { id: props.title })}
    >
      <Flex align={"center"} justify="center">
        <Image
          width="72px"
          height="72px"
          alt="L'objet"
          source={{ uri: props.image }}
        />
        <SimpleSubTitle600 centered>{props.title}</SimpleSubTitle600>
      </Flex>
    </Pressable>
  );
};

const SmallSucce = React.memo((props) => <Item {...props} />);

export { SmallSucce };
