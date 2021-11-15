import React from "react";
import { Flex, Image, Text, Pressable } from "native-base";
import blocked from "./../assets/icons/notDeblocked.png";
import { useNavigation } from "@react-navigation/core";
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
      onPress={() => navigation.navigate("Item", { id: props.intern })}
      maxHeight={170}
      minWidth={120}
      marginRight={2}
      marginLeft={2}
    >
      <Flex
        flex={1}
        borderRadius={10}
        backgroundColor={props.isBlocked ? "brand.pbackground" : "brand.p45"}
        p={3}
      >
        <Image width={70} height={70} alt="L'objet" source={props.image} />
        <Text fontWeight={700} fontSize={16}>
          {props.title}
        </Text>
        <Text fontSize={12} color="brand.iris80">
          {props.description}
        </Text>
      </Flex>
    </Pressable>
  );
};
export const SmallSucce = (props) => {
  const navigation = useNavigation();
  return (
    <Pressable
      width="47%"
      onPress={() => navigation.navigate("Item", { id: props.intern })}
    >
      <Flex
        /* width="47%" */
        borderRadius={10}
        marginBottom={3}
        backgroundColor={props.isBlocked ? "dark.700" : "brand.p45"}
        p={3}
      >
        <Image
          width={100}
          height={100}
          alt="L'objet"
          source={props.isBlocked ? blocked : props.image}
        />
        <Text fontWeight={700} fontSize={16}>
          {props.title}
        </Text>
        <Text
          fontSize={12}
          color={props.isBlocked ? "dark.50" : "brand.iris80"}
        >
          {props.isBlocked ? "A débloquer" : props.description}
        </Text>
      </Flex>
    </Pressable>
  );
};
