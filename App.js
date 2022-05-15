import React from "react";
import { loadAsync, isLoaded } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, extendTheme } from "native-base";
import pacifiScanTheme from "./src/custom_theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Amplitude from "expo-analytics-amplitude";
import {
  Accueil,
  Historique,
  Item,
  Parametre,
  Scan,
  Stat,
  Succe,
  ScanCaddy,
  Caddy,
} from "./screens/index.js";
import { useEffect } from "react";
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

export default function App() {
  useEffect(() => {
    (async () => {
      await preventAutoHideAsync();
      let id = await AsyncStorage.getItem("id");
      if (id == null) {
        setFirstTime(true);
        AsyncStorage.setItem("id", Math.random().toString(36).substring(7));
      }
      try {
        await loadAsync({
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Urbanist_600SemiBold: require("./assets/fonts/Urbanist-SemiBold.ttf"),
          Urbanist_700Bold: require("./assets/fonts/Urbanist-Bold.ttf"),
        });
        console.log("Fonts loaded");
      } catch (error) {
        console.error(error);
      } finally {
        await hideAsync();
      }
      await Amplitude.initializeAsync("50cca50a5ab93a1c1ffaf17cb5330ed").catch(
        (e) => {
          console.error(e);
        }
      );
      await Amplitude.setTrackingOptionsAsync({
        disableAdid: true,
        disableCarrier: true,
        disableIPAddress: true,
      });
      Sentry.init({
        dsn: "https://89ec4ca9d7e14540b52f4146f4c2118f@o403969.ingest.sentry.io/6065620",
      });
    })();
  }, []);

  const theme = extendTheme(pacifiScanTheme);
  SystemUI.setBackgroundColorAsync("#EFF0FF");
  console.log(isLoaded("Urbanist_700Bold"));
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Accueil"
        >
          {/* <Stack.Screen
              name="Permission"
              component={Permission}
              /> */}
          <Stack.Screen
            name="Accueil"
            component={Accueil} /* L'accueil tout simplement */
          />
          <Stack.Screen
            name="Scan"
            component={Scan} /* L'interface pour scan un objet */
          />
          <Stack.Screen
            name="Historique"
            component={Historique} /* Historique des déchets collectés */
          />
          <Stack.Screen
            name="Infos"
            component={Succe}
            /* Composé des infos des déchets ainsi que des news de pacifiscan  */
          />
          <Stack.Screen
            name="Stat"
            component={Stat} /* Stats de l'utilisateur */
          />
          <Stack.Screen
            name="Item"
            component={Item}
            options={{
              presentation: "modal",
              animation: "fade_from_bottom",
            }}
            /* La fiche info d'un item. Doit être appelé avec des arguments */
          />
          <Stack.Screen
            name="Parametre"
            component={Parametre}
            options={{
              presentation: "modal",
            }}
            /* Pour désactiver les outils de collection de données ainsi que voir l'id d'utilisateur */
          />
          <Stack.Screen
            name="ScanCaddy"
            component={ScanCaddy}
            options={{
              presentation: "modal",
            }}
            /* Le mode caddy de l'application */
          />
          <Stack.Screen
            name="Caddy"
            component={Caddy}
            /* Le mode caddy de l'application */
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    /* </GestureHandlerRootView> */
  );
}
