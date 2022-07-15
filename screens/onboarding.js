import Onboarding from "react-native-onboarding-swiper";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Flex, Spinner } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import CommuneSelect from "../components/communeSelector";
import { useState } from "react";

function Onboard({ route, navigation }) {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const firstTime = await AsyncStorage.getItem("Onboard");
      if (firstTime === null) {
        await AsyncStorage.setItem("Onboard", "true");
        setLoading(false);
      } else if (route?.params?.stay === true) {
        setLoading(false);
      } else {
        navigation.navigate("Accueil");
      }
    })();
  }, []);
  const onDone = () => {
    navigation.navigate("Accueil");
    return;
  };
  if (Loading) {
    return (
      <Flex flex={1} bgColor="brand.appColor">
        <Spinner size={50} color="brand.primary" my={"auto"} />
      </Flex>
    );
  }
  return (
    <Onboarding
      onDone={onDone}
      showSkip={false}
      nextLabel="Suivant"
      bottomBarColor="#dddafe"
      titleStyles={{
        fontFamily: "Urbanist_700Bold",
      }}
      subTitleStyles={{
        fontFamily: "Inter_500Medium",
        fontSize: 14,
      }}
      pages={[
        {
          backgroundColor: "#EFF0FF",
          image: (
            <Image
              source={require("../assets/illustration/thanks.png")}
              style={{ aspectRatio: 1.12 }}
              height={"220px"}
              alt="Emoji"
            />
          ),
          title: "Merci d'avoir installé notre application",
          subtitle: "Découvrez comment fonctionne Pacifiscan",
        },
        {
          backgroundColor: "#EFF0FF",
          image: (
            <Image
              source={require("../assets/illustration/scan.png")}
              style={{ aspectRatio: 1.78 }}
              height={"220px"}
              alt="logo"
            />
          ),
          title: "Scanner un déchet",
          subtitle:
            "Lorsque vous trouvez un déchet, scannez-le et découvrez qu'en faire.",
        },
        {
          backgroundColor: "#EFF0FF",
          image: (
            <Image
              source={require("../assets/illustration/stories.png")}
              style={{ aspectRatio: 1 }}
              height={"220px"}
              alt="logo"
            />
          ),
          title: "Stories",
          subtitle:
            "Apprenez à protéger la biodiversité visuellement avec nos stories",
        },
        {
          backgroundColor: "#EFF0FF",
          image: <CommuneSelect />,
          title: "Votre commune",
          subtitle:
            "Indiquez votre commune de résidence pour obtenir des informations personnalisées.",
        },
        {
          backgroundColor: "#EFF0FF",
          image: (
            <Image
              source={require("../assets/icon.png")}
              style={{ aspectRatio: 1 }}
              height={"220px"}
              alt="logo"
            />
          ),
          title: "Condition d'utilisation",
          subtitle:
            "En continuant, vous acceptez que les images que vous avez scannées soient sauvegardées sur nos serveurs afin d'améliorer des algorithmes de reconnaissance d'image",
        },
      ]}
    />
  );
}

export default Onboard;
