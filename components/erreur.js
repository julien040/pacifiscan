import React from "react";
import { Flex, Text, Heading } from "native-base";

export const Erreur = ({erreur}) => {
  return (
    <Flex borderRadius={10} margin="auto" backgroundColor="brand.pbackground" p={4} justify="center" align="center">
      <Heading color="brand.danger" >Nous avons rencontré une erreur</Heading>
      <Text fontWeight={700} >{erreur}</Text>
      <Text marginTop={5} >Si jamais l'erreur persiste, contactez le support avec votre identifiant (voir dans paramètres)</Text>
    </Flex>
  );
};
