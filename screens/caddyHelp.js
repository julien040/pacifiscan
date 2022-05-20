import { Flex, Heading, Text, ScrollView } from "native-base";
import { PacifiScanHeader } from "../components";

function CaddyHelp({ route, navigation }) {
  return (
    <Flex flex={1} backgroundColor="brand.appColor" p={4}>
      <PacifiScanHeader variant="back" />
      <ScrollView flex={1} marginTop={6}>
        <Heading color={"brand.iris100"}>Qu'est ce le mode caddy ?</Heading>
        <Text marginTop={2} fontFamily="Inter_400Regular">
          Le mode caddy permet de scanner les codes-barres des produits et
          découvrir leur impact avant de les acheter. Ainsi, vos achats sont
          plus responsables
        </Text>
        <Heading marginTop={8} color={"brand.iris100"}>
          Comment scanner un code-barre ?
        </Heading>
        <Text marginTop={2} fontFamily="Inter_400Regular">
          Appuyez sur le bouton "Ajouter" en bas à droite de l'écran dans Caddy.
          Une page s'ouvre, acceptez la requête d'accès à la caméra (si vous
          l'avez pas déjà fait). Présentez le code-barre de l'objet à scanner.
          Il n'y a pas besoin d'appuyer sur un bouton, vous serez redirigé dès
          que vous l'application aura detecté le code-barre.
        </Text>
        <Heading marginTop={8} color={"brand.iris100"}>
          Que faire une fois fini ?
        </Heading>
        <Text marginTop={2} fontFamily="Inter_400Regular">
          Appuyez sur le bouton "J'ai fini" en bas à gauche de l'écran dans
          Caddy. Votre caddy est enregistré sur votre téléphone. Vous pouvez
          désormais suivre l'évolution de vos caddys à travers le temps
        </Text>
        <Heading marginTop={8} color={"brand.iris100"}>
          Qu'est-ce que l'eco score ?
        </Heading>
        <Text marginTop={2} fontFamily="Inter_400Regular">
          L'eco score est un indicateur représentant l'impact environnemental de
          produits alimentaires. Il note de 0 à 100 l'impact d'un produit sur la
          nature en se basant de sa production jusqu'au recyclage de son
          emballage. ECO-SCORE est une marque déposée de l'ADEME
        </Text>
        <Heading marginTop={8} color={"brand.iris100"}>
          Comment est calculé le CO2 produit ?
        </Heading>
        <Text marginTop={2} fontFamily="Inter_400Regular">
          Nous utilisons les données Agribalyse produite par l'ADEME. Le CO2
          produit ne reflète donc pas forcément la réalité mais s'en approche.
        </Text>
      </ScrollView>
    </Flex>
  );
}

export default CaddyHelp;
