import AsyncStorage from "@react-native-async-storage/async-storage";
import communes from "../src/donnees/communes";
import { useState, useEffect } from "react";
import { Select, Text, View, Heading } from "native-base";
import { setUserPropertiesAsync } from "expo-analytics-amplitude";

function CommuneSelect() {
  const [Commune, setCommune] = useState(null);
  useEffect(() => {
    (async () => {
      const Commune = await AsyncStorage.getItem("commune");
      if (Commune) {
        setCommune(Commune);
      }
    })();
  }, []);

  function onChange(value) {
    AsyncStorage.setItem("commune", value);
    setCommune(value);
    setUserPropertiesAsync({
      commune: value,
    });
  }

  return (
    <View>
      <Heading marginTop={4} color="brand.iris100">
        Choisissez votre commune
      </Heading>
      <Select onValueChange={onChange} selectedValue={Commune}>
        {Object.keys(communes)
          .sort()
          .map((key) => (
            <Select.Item key={key} label={communes[key].nom} value={key} />
          ))}
      </Select>
    </View>
  );
}
export default CommuneSelect;
