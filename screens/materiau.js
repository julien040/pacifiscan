import { Flex, Image, ScrollView } from "native-base";
import { LargeHeading } from "../components/heading";
import { SimpleSubTitle500, SimpleText400 } from "../components/text";
import { PacifiScanHeader } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import materiaux from "../src/donnees/materiaux";
import Spacer from "../components/spacer";

function Materiau({ route, navigation }) {
  const { id } = route.params;
  const data = materiaux[id];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF0FF" }}>
      <Flex
        backgroundColor="brand.pbackground"
        paddingBottom={1}
        p={4}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader variant="back" />
        <ScrollView flex={1}>
          <Spacer />
          <LargeHeading>{data.nom}</LargeHeading>
          <Spacer />
          <Image
            source={{ uri: data.header }}
            defaultSource={require("../assets/placeholder/Materiau.png")}
            style={{ aspectRatio: 16 / 9 }}
            alt="Une image montrant le matériau"
            borderRadius={8}
          />
          <Spacer />
          <SimpleText400>{data.description}</SimpleText400>
        </ScrollView>
      </Flex>
    </SafeAreaView>
  );
}

export default Materiau;
