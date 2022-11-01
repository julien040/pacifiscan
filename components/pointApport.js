import { Button, Flex, Heading, Spinner, Text, View } from "native-base";
import { useState, useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
} from "expo-location";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import getPointApport from "../src/getPointApport";
import { Pressable, Platform } from "react-native";
import { openURL } from "expo-linking";
import { LargeHeading } from "./heading";

function PointApport({ id }) {
  const [Loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [canRetry, setCanRetry] = useState(true);
  const [Points, setPoints] = useState([]);

  async function askPermission() {
    let granted = (await getForegroundPermissionsAsync()).granted;
    if (!granted) {
      const result = await requestForegroundPermissionsAsync();
      setHasPermission(result.status === "granted");
      if (result.status !== "granted") {
        setCanRetry(result.canAskAgain);
      } else {
        getData();
      }
    } else {
      setHasPermission(true);
      getData();
    }
  }
  async function getData() {
    setLoading(true);
    const { coords } = await getCurrentPositionAsync({ accuracy: 3 });
    const points = getPointApport({
      id,
      longitude: coords.longitude,
      latitude: coords.latitude,
    });

    setPoints(points);
    setLoading(false);
  }

  useEffect(() => {
    askPermission();
  }, []);
  if (hasPermission === null) {
    return (
      <Flex flex={0.5}>
        <Spinner size={50} color="brand.primary" marginTop="auto" />
        <Text
          fontFamily="Inter_600SemiBold"
          color="blueGray.700"
          marginBottom={"auto"}
          textAlign="center"
          marginTop={2}
          letterSpacing={-0.5}
        >
          Chargement...
        </Text>
      </Flex>
    );
  }
  if (hasPermission === false) {
    return (
      <Flex px={3} align={"center"} justify="center" flex={0.5}>
        <Heading marginBottom={2} fontSize={18} textAlign="center">
          Vous devez autoriser l'accès à votre position pour utiliser cette
          fonctionnalité.
        </Heading>
        {canRetry && (
          <>
            <Button onPress={askPermission}>
              Autorisez l'accès à votre position
            </Button>
          </>
        )}
        {!canRetry && (
          <Text
            fontFamily="Inter_600SemiBold"
            color="blueGray.700"
            textAlign="center"
            letterSpacing={-0.5}
          >
            Vous avez déjà refusé l'accès à votre position. Allez dans les
            paramètres de l'appareil, cherchez Pacifiscan dans Applications et
            accordez l'accès à la géolocalisation.
          </Text>
        )}
      </Flex>
    );
  }
  return (
    <BottomSheetFlatList
      data={Points}
      renderItem={({ item }) => <ItemPointApportComponent item={item} />}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => (
        <Text
          fontFamily="Inter_500Medium"
          fontSize={13}
          color="blueGray.500"
          letterSpacing={-0.5}
        >
          Liste des points d'apport
        </Text>
      )}
      ListEmptyComponent={
        Loading ? (
          <Text
            textAlign="center"
            marginTop={4}
            fontFamily="Inter_600SemiBold"
            color="blueGray.700"
            letterSpacing={-0.5}
          >
            Chargement...
          </Text>
        ) : (
          <Text
            textAlign="center"
            fontFamily="Inter_600SemiBold"
            color="blueGray.700"
            letterSpacing={-0.5}
          >
            Aucun point d'apport trouvé.
          </Text>
        )
      }
      refreshing={Loading}
      onRefresh={getData}
      style={{ padding: 12, paddingTop: 0 }}
    />
  );
}

function getDirectionLink(latitude, longitude) {
  if (Platform.OS === "android") {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  }
  return `https://maps.apple.com/?daddr=${latitude},${longitude}`;
}

const ItemPointApportComponent = ({ item }) => {
  return (
    <Flex my={2} bgColor={"brand.pbackground"} px={3} py={4} borderRadius={10}>
      <Flex justify="space-between" direction="row" align="center">
        <Text
          letterSpacing={-0.5}
          fontFamily="Inter_600SemiBold"
          color="blueGray.800"
          fontSize={14}
        >
          {item.nom}
        </Text>
        <Text
          letterSpacing={-0.5}
          fontFamily="Inter_600SemiBold"
          color="blueGray.400"
          fontSize={13}
        >
          {item.distance > 1000
            ? `${(item.distance / 1000).toFixed(1)} km`
            : `${item.distance.toFixed(0)} m`}
        </Text>
      </Flex>
      <Flex
        marginTop={1}
        justify="space-between"
        direction="row"
        align="center"
      >
        <Text
          letterSpacing={-0.5}
          fontFamily="Inter_500Medium"
          color="blueGray.500"
        >
          {item.categorie.split("")[0].toUpperCase() +
            item.categorie.slice(1).toLowerCase()}
        </Text>
        <Pressable
          onPress={() => {
            openURL(getDirectionLink(item.latitude, item.longitude));
          }}
        >
          <Text
            color={"brand.iris80"}
            fontFamily="Inter_600SemiBold"
            fontSize={13}
            letterSpacing={-0.5}
          >
            S'y rendre {">"}{" "}
          </Text>
        </Pressable>
      </Flex>
    </Flex>
  );
};

export { getDirectionLink };

export default PointApport;
