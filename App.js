import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { RootSiblingParent } from 'react-native-root-siblings';
import { NativeBaseProvider, extendTheme } from "native-base";
import pacifiScanTheme from "./src/custom_theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Accueil,
  Historique,
  Item,
  Parametre,
  Recherche,
  Scan,
  Stat,
  Succe,
  Caddy
} from "./screens/index.js";
const Stack = createNativeStackNavigator();

export default function App() {
  const theme = extendTheme(pacifiScanTheme);
  let [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Urbanist_semi: require("./assets/fonts/Urbanist-SemiBold.ttf"),
    Urbanist_bold: require("./assets/fonts/Urbanist-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Accueil"
          >
            <Stack.Screen
              name="Accueil"
              component={Accueil} /* L'accueil tout simplement */
            />
            <Stack.Screen
              name="Recherche"
              component={Recherche} /* A voir pour l'usage */
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
              /* La fiche info d'un item. Doit être appelé avec des arguments */
            />
            <Stack.Screen
              name="Parametre"
              component={Parametre}
              /* Pour désactiver les outils de collection de données ainsi que voir l'id d'utilisateur */
            />
            <Stack.Screen
              name="Caddy"
              component={Caddy}
              /* Le mode caddy de l'application */
            />
          </Stack.Navigator>
        </NavigationContainer>
        </RootSiblingParent>
      </NativeBaseProvider>
    );
  }
}
