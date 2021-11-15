import React from "react";
import { Flex, View, Heading, Text, Button, Progress, HStack } from "native-base";
import Svg,{Path} from "react-native-svg";
import { useBottomSheet } from "@gorhom/bottom-sheet";
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
      margin={kg? "0" : "auto"}
      p={4}
      direction="row"
      backgroundColor="brand.p45"
    >
      <View flex={1}>
        <Heading color={firstStat < 50 ? "red.400" : "green.600"} fontSize={36}>
          {firstStat}
        </Heading>
        <Heading fontSize={14}>{kg ? "Eco Score (sur 100)" : "Note moyenne"}</Heading>
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
    <Flex align="center" justify="space-between" borderRadius={8} backgroundColor="brand.pbackground" p={3} direction="row">
      <Heading color="brand.iris100" flex={1} fontSize={28}>{score}</Heading>
      <Text onPress={() => {openBottomSheet(idBarCode)}} flex={5} >{text} </Text>
      <Svg
      width={32}
      height={32}
      flex={1}
      onPress={() => {toDelete(id)}}
    >
      <Path
        d="M15 6.5h4.5a.75.75 0 110 1.5h-.83l-1.128 10.164a3.75 3.75 0 01-3.727 3.336h-3.63a3.75 3.75 0 01-3.728-3.336L5.329 8H4.5a.75.75 0 010-1.5H9a3 3 0 116 0zM12 5a1.5 1.5 0 00-1.5 1.5h3A1.5 1.5 0 0012 5zm-2.25 6v6a.75.75 0 101.5 0v-6a.75.75 0 10-1.5 0zm3.75-.75a.75.75 0 00-.75.75v6a.75.75 0 101.5 0v-6a.75.75 0 00-.75-.75z"
        fill="#5D5FEF"
        scale={1.2}
      />
    </Svg>
    </Flex>
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
  details
}) => {
  const { close } = useBottomSheet();
  return (
    <Flex flex={1} justify="flex-start" backgroundColor="brand.pbackground" p={3}>
      <Heading>{name}</Heading>
      <Text marginTop={4} style={{textAlign:"right"}} color="brand.iris80">Voir comment ce chiffre est calculé {" >"}</Text>
      <Flex marginTop={2} marginBottom={2} justify="flex-start" flex={1} >
      <CaddyStats kg firstStat={!score? "Inconnu" : score} secondStat={Math.round(co2*quantity/1000 * 100) /100 === 0 ? "Inconnu" : Math.round(co2*quantity/1000 * 100) /100 } />
      <Heading marginTop={4} fontSize={18} >Détails :</Heading>
        <Flex  borderRadius={10} backgroundColor="brand.p45" p={2} justify="space-between" align="flex-start" marginTop={2} >
          <Flex direction="row" align="center" >
          <Heading color="brand.primary" fontSize={16}>Note de production : </Heading>
          <Heading color="brand.iris80" >{details.agribalyse.score} pt(s)</Heading>
          </Flex>
          <Flex direction="row" align="center" >
          <Heading color="brand.primary" fontSize={16}>Origine : </Heading>
          <Heading color={details.adjustments.origins_of_ingredients.epi_value <0 ? "brand.danger" : "green.700"} >{details.adjustments.origins_of_ingredients.epi_value} pt(s)</Heading>
          </Flex>
          <Flex direction="row" align="center" >
          <Heading color="brand.primary" fontSize={16}>Packaging : </Heading>
          <Heading color={details.adjustments.packaging.value <0 ? "brand.danger" : "green.700"} >{details.adjustments.packaging.value} pt(s)</Heading>
          </Flex>
          <Flex direction="row" align="center" >
          <Heading color="brand.primary" fontSize={16}>Label responsable : </Heading>
          <Heading color={details.adjustments.production_system.value <0 ? "brand.danger" : "green.700"} >{details.adjustments.production_system.value} pt(s)</Heading>
          </Flex>
      </Flex>
      </Flex>
      <Flex opacity={buttonInvisible ? 0 : 100} justify="space-between" width="100%" direction="row" >
        <Button onPress={() => close()} backgroundColor="brand.p45" width="48%">Je repose</Button>
        <Button onPress={() => addItems({name, score, quantity, co2, idBarCode})} width="48%">Dans le caddy</Button>
      </Flex>
    </Flex>
  )
};
