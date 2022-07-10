import React from "react";
import { FlatList, Spinner } from "native-base";
import { SmallItem } from "./singleItem";
import dechets from "../src/donnees/dechets";

const names = Object.keys(dechets);

export const HomeSucces = () => {
  return (
    <FlatList
      horizontal={true}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      ListEmptyComponent={() => <Spinner size={40} color="brand.iris80" />}
      data={names}
      renderItem={({ item, index }) => (
        <SmallItem title={item} image={dechets[item].icone} />
      )}
    />
  );
};
export default HomeSucces;
