import { Flex, Heading } from "native-base";
import { PacifiScanHeader } from "../components";
import WebView from "react-native-webview";

const Story = ({ route, navigation }) => {
  const { id } = route.params;
  return (
    <Flex backgroundColor="brand.appColor" p={4} flex={1}>
      <PacifiScanHeader variant="back" />
      <WebView
        source={{
          uri: `https://julien040-pacifiscan-stories-6qgrwj452756-3000.githubpreview.dev/${id}`,
        }}
        style={{ flex: 1 }}
      />
      <Heading>{id}</Heading>
    </Flex>
  );
};

export default Story;
