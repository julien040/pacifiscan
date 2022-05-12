import React from "react";
import {
  Flex,
  View,
  Heading,
  Text,
  Button,
  Alert,
  Spinner,
  Pressable,
} from "native-base";
import Svg, { Path } from "react-native-svg";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { logEventWithPropertiesAsync } from "expo-analytics-amplitude";
import { infoRandom } from "../src/leSaviezVous";
/**
 * @param  {string|number} firstStat - Le premier nombre à afficher dans le composant (ex: "10")
 * @param  {string|number} secondStat - Le second nombre à afficher dans le composant (ex: "8")
 * @param {boolean} kg - Si true, les nombres sont en kg, sinon en tonnes
 * @example Pour afficher 10 et 8 dans le composant
 * <Caddy firstStat="10" secondStat="8" />
 */
export const CaddyStats = ({ firstStat, secondStat, kg }) => {
  return (
    <Flex
      borderRadius={10}
      p={4}
      height={105}
      marginTop={2}
      marginBottom={4}
      /* flex={1} */
      overflow="hidden"
      direction="row"
      backgroundColor="brand.p45"
    >
      <View flex={1}>
        <Heading color={firstStat < 50 ? "red.400" : "green.600"} fontSize={36}>
          {firstStat}
        </Heading>
        <Heading fontSize={14}>
          {kg ? "Eco Score (sur 100)" : "Note moyenne"}
        </Heading>
      </View>
      <View flex={1}>
        <Heading color="brand.iris100" fontSize={36}>
          {secondStat}
        </Heading>
        <Heading fontSize={14}> Kg de CO2 créé(s) </Heading>
      </View>
    </Flex>
  );
};
/**
 * @param {{
 * score:string|number,
 * text:string,
 * toDelete:Function,
 * idBarCode:string,
 * openBottomSheet:Function,
 * }}
 */
export const SingleProductCaddy = ({
  id,
  score,
  text,
  toDelete,
  idBarCode,
  openBottomSheet,
}) => {
  return (
    <Pressable
      onPress={() => {
        openBottomSheet(idBarCode);
      }}
      flex={1}
    >
      <Flex
        align="center"
        justify="space-between"
        borderRadius={8}
        backgroundColor="brand.pbackground"
        p={3}
        direction="row"
      >
        <Heading color="brand.iris100" flex={1} fontSize={28}>
          {score}
        </Heading>
        <Text flex={5}>{text} </Text>

        <Svg
          width={32}
          height={32}
          flex={1}
          onPress={() => {
            toDelete(id);
          }}
        >
          <Path
            d="M15 6.5h4.5a.75.75 0 110 1.5h-.83l-1.128 10.164a3.75 3.75 0 01-3.727 3.336h-3.63a3.75 3.75 0 01-3.728-3.336L5.329 8H4.5a.75.75 0 010-1.5H9a3 3 0 116 0zM12 5a1.5 1.5 0 00-1.5 1.5h3A1.5 1.5 0 0012 5zm-2.25 6v6a.75.75 0 101.5 0v-6a.75.75 0 10-1.5 0zm3.75-.75a.75.75 0 00-.75.75v6a.75.75 0 101.5 0v-6a.75.75 0 00-.75-.75z"
            fill="#5D5FEF"
            scale={1.2}
          />
        </Svg>
      </Flex>
    </Pressable>
  );
};
/**
 * L'élément qui sera affiché dans le bottomSheet. Si ButtonInvisible est true, les boutons seront invisible (mais existeront toujours)
 * @param {{
 * score:string|number,
 * text:string,
 * idBarCode:string,
 * quantity:number,
 * addItems:Function,
 * image:string,
 * buttonInvisible:boolean,
 * details:{adjustments:{origins_of_ingredients:{epi_value:number}, packaging:{value:number}, production_system:{value:number}}, agribalyse:{score:number, co2_agriculture:string, co2_consumption:string, co2_distribution:string, co2_packaging:string, co2_processing:string, co2_transportation:string}}
 * }}
 */
export const BottomSheetItem = ({
  score,
  name,
  quantity,
  co2,
  idBarCode,
  addItems,
  buttonInvisible,
  details,
  loading,
}) => {
  const { close } = useBottomSheet();
  if (loading === true) {
    return (
      <Flex justify="center" align="center">
        <Heading color="brand.iris100">Chargement...</Heading>
        <Spinner size={100} color="test" />
      </Flex>
    );
  } else {
    return (
      <Flex
        flex={1}
        justify="flex-start"
        backgroundColor="brand.pbackground"
        p={3}
      >
        <Heading>{name}</Heading>
        <Text marginTop={4} style={{ textAlign: "right" }} color="brand.iris80">
          Voir comment ce chiffre est calculé {" >"}
        </Text>
        <Flex marginTop={2} marginBottom={2} justify="flex-start" flex={1}>
          <CaddyStats
            kg
            firstStat={!score ? "Inconnu" : score}
            secondStat={
              Math.round(((co2 * quantity) / 1000) * 100) / 100 === 0
                ? "Inconnu"
                : Math.round(((co2 * quantity) / 1000) * 100) / 100
            }
          />
          <Alert
            marginTop={6}
            backgroundColor="brand.p45"
            status="info"
            width="100%"
            p={3}
          >
            <Flex
              width="100%"
              direction="row"
              align="center"
              justify="flex-start"
            >
              <Alert.Icon marginRight={2} color="brand.iris80" />
              <Heading fontSize={20} color="brand.iris100">
                Le saviez-vous ?
              </Heading>
            </Flex>
            <Text marginTop={2} width="100%">
              {infoRandom[Math.floor(Math.random() * infoRandom.length)]}
            </Text>
          </Alert>
        </Flex>
        <Flex
          display={buttonInvisible ? "none" : "flex"}
          justify="space-between"
          width="100%"
          direction="row"
        >
          <Button
            onPress={() => {
              logEventWithPropertiesAsync("ItemRepose", {
                score,
                name,
                co2,
                idBarCode,
                date: Date.now(),
              });
              close();
            }}
            backgroundColor="brand.p45"
            width="48%"
          >
            Je repose
          </Button>
          <Button
            onPress={() => addItems({ name, score, quantity, co2, idBarCode })}
            width="48%"
          >
            Dans le caddy
          </Button>
        </Flex>
      </Flex>
    );
  }
};
