import React from "react";
import { Text, Button, Flex } from "native-base";
import { PacifiScanHeader, PacifiScanFooter } from "../components";

function Historique({ route, navigation }) {
  return (
    <Flex backgroundColor="brand.appColor" p={4} justify="space-between">
        <PacifiScanHeader />
        <Flex>
            <Text>Testtttt</Text>
        </Flex>
        <PacifiScanFooter />
    </Flex>
  );
}

export default Historique;
