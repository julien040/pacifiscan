import { Flex, Heading, Spinner, Text } from "native-base";
import { useEffect, useState } from "react";
import { getCollecte, getCommune } from "../src/getCollecte";
import communes from "../src/donnees/communes";

function Collecte({ id }) {
  const [pointCollecte, setPointCollecte] = useState(null);
  const [Commune, setCommune] = useState();
  useEffect(() => {
    (async () => {
      const point = await getCollecte(id);
      setPointCollecte(point);
      const commune = await getCommune();
      setCommune(commune);
    })();
  }, []);
  if (pointCollecte === null) {
    return (
      <Flex>
        <Spinner size={50} color="brand.primary" my={"auto"} />
      </Flex>
    );
  }
  return (
    <Flex px={3}>
      <Text
        marginTop={"auto"}
        fontFamily="Inter_500Medium"
        fontSize={14}
        color="blueGray.600"
      >
        {Commune === null
          ? "Vous n'avez pas sélectionné de commune dans les paramètres "
          : "Votre commune : " + communes[Commune].nom}
      </Text>
      {pointCollecte.map((point) => (
        <Flex marginTop={4} key={point.nom}>
          <Heading>{point.nom}</Heading>
          <Text>{point.description}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
export default Collecte;
