import { Flex, Image, Text, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SimpleText400 } from "./text";

function RedirectionOletriPage() {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Oletri")}
      bgColor={"brand.pdark"}
      p={3}
      px={4}
      borderRadius={10}
      mb={4}
    >
      <Flex flex={1} direction="row" alignItems={"center"}>
        <Image
          alt="Le logo Oletri"
          flex={2}
          style={{ aspectRatio: 2.614 }}
          source={require("../assets/illustration/oletri.png")}
          marginRight={4}
        />
        <Text
          flex={8}
          fontFamily="Inter_500Medium"
          letterSpacing={-0.55}
          fontSize={14}
        >
          Avec Oletri, échangez vos déchets contre des bons d'achat !
        </Text>
        <Text fontFamily="Inter_500Medium" letterSpacing={-0.55} fontSize={14}>
          {">"}
        </Text>
      </Flex>
    </Pressable>
  );
}

export { RedirectionOletriPage };
