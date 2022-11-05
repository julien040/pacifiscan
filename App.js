import React from "react";
import { loadAsync } from "expo-font";
import { Platform } from "react-native";
import { setStatusBarStyle } from "expo-status-bar";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NativeBaseProvider, extendTheme, Spinner, Text } from "native-base";
import pacifiScanTheme from "./src/custom_theme/theme";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Amplitude from "expo-analytics-amplitude";
import {
  Accueil,
  Historique,
  Item,
  Materiau,
  Oletri,
  Parametre,
  Scan,
  ScanSelecteur,
  ScanInconnu,
  Succe,
  Story,
  Stories,
  Onboard,
} from "./screens/index.js";
import { useEffect, useState } from "react";
import * as Sentry from "sentry-expo";
import * as SystemUI from "expo-system-ui";

const Stack = createNativeStackNavigator();

Amplitude.initializeAsync("50cca50a5ab93a1c1ffaf17cb5330ed7").catch((e) => {
  console.error(e);
});
Amplitude.setTrackingOptionsAsync({
  /* disableAdid: true, */
  disableCarrier: true,
  disableIPAddress: true,
  disableLatLng: true,
});

Amplitude.logEventAsync("Démarrage");

Sentry.init({
  dsn: "https://89ec4ca9d7e14540b52f4146f4c2118f@o403969.ingest.sentry.io/6065620",
});

export default function App() {
  const [Loaded, setLoaded] = useState(false);
  const [Theme, setTheme] = useState({});
  useEffect(() => {
    (async () => {
      await preventAutoHideAsync();
      try {
        await loadAsync({
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
          Urbanist_600SemiBold,
          Urbanist_700Bold,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setTheme(pacifiScanTheme);
        setLoaded(true);
        await hideAsync();
      }
    })();
  }, []);

  // Create a unique identifier for the app
  useEffect(() => {
    (async () => {
      let id = await AsyncStorage.getItem("id");
      if (id == null) {
        await AsyncStorage.setItem(
          "id",
          Math.random().toString(36).substring(7)
        );
      }
    })();
  }, []);

  if (!Loaded) {
    return (
      <NativeBaseProvider>
        <Spinner marginTop={"auto"} size={50} />
        <Text
          marginTop={2}
          fontSize={16}
          textAlign="center"
          marginBottom="auto"
        >
          Chargement...
        </Text>
      </NativeBaseProvider>
    );
  }
  const theme = extendTheme(Theme);
  SystemUI.setBackgroundColorAsync("#EFF0FF");

  setStatusBarStyle("dark");
  if (Platform.OS === "android") {
    setBackgroundColorAsync("#EFF0FF");
    setButtonStyleAsync("dark");
  }

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: Platform.OS === "android" ? "simple_push" : "fade",
            }}
            initialRouteName="Onboard"
          >
            <Stack.Screen name="Onboard" component={Onboard} />
            <Stack.Screen
              name="Accueil"
              component={Accueil} /* L'accueil tout simplement */
            />
            <Stack.Screen
              name="Scan"
              component={Scan} /* L'interface pour scan un objet */
            />
            <Stack.Screen
              name="ScanSelecteur"
              component={
                ScanSelecteur
              } /* L'interface pour choisir quel objet a été scanné */
              options={{
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="ScanInconnu"
              component={
                ScanInconnu
              } /* L'interface pour choisir quel objet a été scanné */
              options={{
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="Historique"
              component={Historique} /* Historique des déchets collectés */
              options={{
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="Infos"
              component={Succe}
              /* Composé des infos des déchets ainsi que des news de pacifiscan  */
            />
            <Stack.Screen
              name="Item"
              component={Item}
              options={{
                presentation: "fullScreenModal",
                animation: "fade_from_bottom",
              }}
              /* La fiche info d'un item. Doit être appelé avec des arguments */
            />
            <Stack.Screen
              name="Materiau"
              component={Materiau}
              options={{
                presentation: "modal",
                contentStyle: {
                  backgroundColor: "#EFF0FF",
                },
                animation: "fade_from_bottom",
              }}
            />
            <Stack.Screen
              name="Oletri"
              component={Oletri}
              options={{
                presentation: "modal",
                animation: "fade_from_bottom",
              }}
            />

            <Stack.Screen
              name="Parametre"
              component={Parametre}
              options={{
                presentation: "fullScreenModal",
                animation: "fade_from_bottom",
              }}
              /* Pour désactiver les outils de collection de données ainsi que voir l'id d'utilisateur */
            />
            <Stack.Screen
              name="Story"
              component={Story}
              options={{
                presentation: "modal",
                animation: "fade_from_bottom",
              }}
            />

            <Stack.Screen name="Stories" component={Stories} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
