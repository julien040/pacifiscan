import React from "react";
import { Flex, Image, Text, ScrollView } from "native-base";
import { SmallItem } from "./singleItem";
import { wastesType } from "../src/waste/waste";

export const HomeSucces = (props) => {
  return (
    <ScrollView horizontal>
      {Object.keys(wastesType).map((key) => (
        <SmallItem
          key={key}
          intern={key}
          title={wastesType[key].nom}
          image={wastesType[key].image}
          description={wastesType[key].smallText}
        />
      ))}
    </ScrollView>
  );
};
