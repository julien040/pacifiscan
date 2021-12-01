import React, { useState, useEffect } from "react";
import { Text, Button, Flex, FlatList, Heading, Image } from "native-base";
import { PacifiScanHeader, PacifiScanFooter } from "../components";
import { getArray } from "../src/database/array";
import { associationApi, wastesType } from "../src/waste/waste";
import  dayjs from "dayjs";

function Historique() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      await refreshData();
    })();
  }, []);
  const [isRefreshing, setisRefreshing] = useState(false);

  async function refreshData() {
    const data = await getArray("Scanned")
    setData(data.reverse());
    setisRefreshing(false);
  }
  return (
    <Flex
      flex={1}
      backgroundColor="brand.appColor"
      p={4}
      justify="space-between"
    >
      <PacifiScanHeader />
      <Heading marginTop={4}>Historique</Heading>
      <FlatList
        marginTop={2}
        flex={1}
        data={Data}
        refreshing={isRefreshing}
        onRefresh={async () => {
          await refreshData();
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Item refresh={refreshData} item={item} index={index} />
        )}
      />
      <PacifiScanFooter active="Rewind" />
    </Flex>
  );
}

const Item = ({ item, index, refresh }) => {
  const t = new Date(item.timestamp * 1000);
  return (
    <Flex
      direction="row"
      borderRadius={10}
      p={3}
      backgroundColor="brand.pbackground"
      m={1}
      flex={1}
    >
      <Image
        marginRight={2}
        alt={item.type}
        source={wastesType[associationApi[item.type]].image}
        width={10}
        height={10}
      />
      <Text flex={1}>
        Vous avez scanné{" "}
        <Text fontWeight={700} color="brand.iris80">
          {associationApi[item.type]}
        </Text>{" "}
        {dayjs(item.timestamp).format("DD/MM/YYYY à hh:mm")} UTC
      </Text>
    </Flex>
  );
};

export default Historique;
