import React from "react";
import { FlatList, Spinner } from "native-base";
import { SmallItem } from "./singleItem";
import { wastesType } from "../src/waste/waste";

export const HomeSucces = (props) => {
  return (
    <FlatList
      horizontal={true}
      initialNumToRender={3}
      ListEmptyComponent={() => <Spinner size={40} color="brand.iris80" />}
      data={Object.keys(wastesType)}
      renderItem={({ item, index }) => (
        <SmallItem title={item} image={wastesType[item].image} />
      )}
    />
  );
};
export default HomeSucces;

{
  /* <ScrollView horizontal>
      {Object.keys(wastesType).map((key) => (
        <SmallItem
          key={key}
          intern={key}
          title={key}
          image={wastesType[key].image}
          description={wastesType[key].smallText}
        />
      ))}
    </ScrollView> */
}
