import { Flex, Image } from "native-base";
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
        <Flex flex={1}>
          <Spacer />
          <LargeHeading>{id}</LargeHeading>
          <Spacer />
          <Image
            source={{ uri: data.header }}
            style={{ aspectRatio: 16 / 9 }}
            alt="Une image montrant le matériau"
            borderRadius={8}
          />
          <Spacer />
          <SimpleText400>{data.description}</SimpleText400>
        </Flex>
      </Flex>
    </SafeAreaView>
  );
}

export default Materiau;
