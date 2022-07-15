import { Text, Radio } from "native-base";
import Collecte from "./collecte";
import PointApport from "./pointApport";
import { useState } from "react";
import dechets from "../src/donnees/dechets";

function OuJeter({ id }) {
  const [Tab, setTab] = useState("Point d'apport");
  /** @type {dechets["Ampoule"]}
   */
  const data = dechets[id];
  // We check if wether the "collecte" or "point d'apport" is available with this waste.
  const collecteAvailable = data.collecte !== null;
  const apportAvailable = data.ouDeposer !== null;

  if (collecteAvailable && apportAvailable) {
    return (
      <>
        <Radio.Group
          px={3}
          marginBottom={1}
          _radio={{
            bgColor: "brand.p45",
            borderWidth: 0, // Remove the border of the radio button
            _text: {
              fontFamily: "Inter_600SemiBold",
              fontSize: 14,
              letterSpacing: -0.5,
            },
            _icon: { color: "brand.iris50" },
          }}
          direction="row"
          onChange={(value) => setTab(value)}
          value={Tab}
        >
          <Radio value="Point d'apport">Point d'apport</Radio>
          <Radio marginLeft={4} value="Collecte">
            Collecte
          </Radio>
        </Radio.Group>
        {Tab === "Point d'apport" && <PointApport id={id} />}
        {Tab === "Collecte" && <Collecte id={id} />}
      </>
    );
  }
  if (collecteAvailable) {
    return <Collecte id={id} />;
  }
  if (apportAvailable) {
    return <PointApport id={id} />;
  } else {
    return (
      <Text
        px={2}
        fontFamily="Inter_600SemiBold"
        fontSize={14}
        letterSpacing={-0.5}
      >
        Nous n'avons pas de point d'apport disponible pour ce déchet dans notre
        base de données.
      </Text>
    );
  }
}

export default OuJeter;
