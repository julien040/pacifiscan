import { Text, Flex, ScrollView, Image, Button } from "native-base";
import { PacifiScanHeader } from "../components/index";

import { SafeAreaView } from "react-native-safe-area-context";
import { LargeHeading } from "../components/heading";

const ScanInconnu = ({ route, navigation }) => {
  const confidence = route?.params?.confidence || 0;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex
        justify={"space-between"}
        backgroundColor="brand.appColor"
        p={4}
        flex={1}
      >
        <PacifiScanHeader variant="back" />
        <LargeHeading>Erreur</LargeHeading>
        <Image
          source={require("../assets/illustration/no-results-found.png")}
          maxHeight={320}
          width={320}
          alt="Illustration erreur"
          mx="auto"
          resizeMode="cover"
        />
        <ScrollView paddingTop={4} flex={1}>
          <Text
            fontFamily="Inter_500Medium"
            letterSpacing={-0.5}
            fontSize={16}
            marginTop={2}
          >
            Nous sommes désolés, nous n'avons pas pu identifier votre déchet.{" "}
            Nous n'étions sûr qu'à {(confidence * 100).toFixed()} % donc nous
            avons préféré ne pas montrer ce déchet. En dessous de 50% de
            confiance, les déchets ne sont pas considérés comme reconnus.
            {"\n \n"}
            Vous pouvez réessayer en prenant un différent point de vue ou vous
            pouvez chercher votre déchet à partir de son nom.
            {"\n"}
            Encore désolé de la gêne occasionnée.
          </Text>
        </ScrollView>
        <Flex marginTop={"auto"} direction="row" justify="space-between">
          <Button onPress={() => navigation.goBack()} width={"48%"}>
            Scanner
          </Button>
          <Button onPress={() => navigation.navigate("Infos")} width={"48%"}>
            Rechercher
          </Button>
        </Flex>
      </Flex>
    </SafeAreaView>
  );
};

export default ScanInconnu;
