import { PacifiScanHeader } from "../components";
import { logEventWithPropertiesAsync } from "expo-analytics-amplitude";
import { Vibration } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, Flex, Heading, Spinner, Text } from "native-base";
import { useState, useEffect } from "react";

function ScanCaddy({ route, navigation }) {
  const [Permissions, setPermissions] = useState(null);
  let alreadyScanned = false;
  async function requestPermission() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setPermissions(status === "granted");
  }
  function handleBarCodeScanned({ data }) {
    // In case of multiple scans, we only want to trigger the callback once
    if (alreadyScanned) {
      return;
    } else {
      alreadyScanned = true;
    }
    Vibration.vibrate(60);
    // Log the event to Amplitude
    logEventWithPropertiesAsync("Produit scanné", {
      id: data,
      date: Date.now(),
    });
    // Navigate to the caddy screen
    navigation.push("Caddy", { id: data });
  }
  useEffect(() => {
    // On load, we check if the user has granted the permission
    requestPermission();
  }, []);
  // Case permissions are not loaded or pages is not focused
  if (Permissions === null || navigation.isFocused === false) {
    return (
      <Flex
        backgroundColor="brand.appColor"
        p={4}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader variant="back" />
        <Flex flex={1} justify="center" align={"center"}>
          <Spinner color={"brand.iris80"} size={50} />
          <Heading>Chargement...</Heading>
        </Flex>
      </Flex>
    );
  } else if (Permissions === false) {
    // Case user has not granted the permission
    return (
      <Flex
        backgroundColor="brand.appColor"
        p={4}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader variant="back" />
        <Heading textAlign="center">
          Nous avons besoin de la permission photo pour scanner des objets
        </Heading>
        <Button
          onPress={() => {
            requestPermission();
          }}
        >
          Autoriser l'appli
        </Button>
      </Flex>
    );
  } else if (Permissions === true) {
    // Case user has granted the permission
    return (
      <Flex
        backgroundColor="brand.appColor"
        p={4}
        flex={1}
        justify="space-between"
      >
        <PacifiScanHeader variant="back" />
        <Flex flex={1} justify="center">
          <Heading>Scannez un objet pour l'ajouter à votre caddy</Heading>
          <Text fontFamily="Inter_400Regular" fontSize={12}>
            Présentez le code barre de l'objet à scanner au milieu de l'écran
          </Text>
        </Flex>
        <BarCodeScanner
          style={{ flex: 4 }}
          onBarCodeScanned={(data) => handleBarCodeScanned(data)}
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.upc_e,
          ]}
        />
      </Flex>
    );
  }
}

export default ScanCaddy;
