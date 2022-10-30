import { Flex, Image, Pressable, ScrollView, Text } from "native-base";
import { SmallHeading, LargeHeading } from "../components/heading";
import Spacer from "../components/spacer";
import { PacifiScanHeader } from "../components";
import oletri from "../src/donnees/oletri";
import { SimpleSubTitle500, SimpleText400 } from "../components/text";
import { openURL } from "expo-linking";
import { FlatList } from "react-native";
import { getDirectionLink } from "../components/pointApport";

// Create a itenary in Google Maps
function openInGoogleMaps(lat, lng) {
  openURL(getDirectionLink(lat, lng));
}

export default function Oletri({ navigation }) {
  return (
    <ScrollView flex={1} p={4} bg="brand.pbackground">
      <PacifiScanHeader variant="back" />
      <LargeHeading>Oletri</LargeHeading>
      <Image
        source={require("../assets/illustration/oletri.png")}
        alt="Logo Oletri"
        my={6}
        mx="auto"
        style={{ aspectRatio: 2.614 }}
        h="96px"
      />
      <SmallHeading>Comment ça marche ?</SmallHeading>
      <SimpleText400>
        Olétri récompense ton geste de tri.
        {"\n"}Pour chaque déchet trié, tu gagnes des points.
        {"\n"}Tu peux ensuite échanger tes points contre des cadeaux ou des bons
        d'achat.
      </SimpleText400>
      <Spacer />
      <SmallHeading>Quels déchets sont acceptés ?</SmallHeading>
      <SimpleText400>
        Oletri accepte les bouteilles en plastique, les bouchons en plastique
        ainsi que les canettes en aluminium.
      </SimpleText400>
      <Spacer />
      <SmallHeading>Combien puis-je gagner ?</SmallHeading>
      <SimpleText400>
        Plus tu tries, plus tu gagnes de points.{`\n`}
        1kg = 100 points = 100 F CFP
      </SimpleText400>
      <Spacer />
      <SmallHeading>Comment échanger mes points ?</SmallHeading>
      <SimpleText400>
        A partir de 500 points, tu peux échanger tes points contre des cadeaux
        ou des bons d'achat.
      </SimpleText400>
      <Spacer />
      <SmallHeading>Où deposer mes déchets ?</SmallHeading>
      <FlatList
        data={oletri}
        horizontal
        renderItem={({ item }) => (
          <Pressable
            bg="brand.p45"
            borderRadius={12}
            p={3}
            mt={3}
            mr={2}
            key={item.nom}
            onPress={() => openInGoogleMaps(item.lat, item.lon)}
          >
            <SimpleSubTitle500>{item.nom}</SimpleSubTitle500>
            <Text
              fontFamily="Inter_400Regular"
              fontSize={13}
              color="gray.600"
              letterSpacing={-0.5}
            >
              {item.horaires}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.nom}
      />
    </ScrollView>
  );
}
