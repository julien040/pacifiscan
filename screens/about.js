import { Flex, Heading } from "native-base";
import { PacifiScanHeader } from "../components";

function About() {
  return (
    <Flex flex={1} p={4} backgroundColor="brand.appColor">
      <PacifiScanHeader variant="back" />
      <Heading>A propos</Heading>
    </Flex>
  );
}

export default About;
