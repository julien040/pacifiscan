import React, { useState, useEffect, useRef } from "react";
import { Flex, Heading, Button, Box, FlatList, Modal } from "native-base";
import { PacifiScanFooter, PacifiScanHeader } from "../components/index";
import Toast from 'react-native-root-toast';
import {
  addToArray,
  getArray,
  deleteFromArray,
  clearArray,
} from "../src/database/array";
import { Erreur } from "../components/erreur";
import {
  CaddyStats,
  SingleProductCaddy,
  BottomSheetItem,
} from "../components/caddyComponents";
import BottomSheet from "@gorhom/bottom-sheet";
function Caddy({ route, navigation }) {
  const [ModalVisible, setModalVisible] = useState(false);
  const [Stats, setStats] = useState([0, 0]);
  const bottomSheetRef = useRef(null); //Pour le bottom sheet afin de le contrôler à distance
  /** @type {[Items:[{id:string, name:string, quantity:number, score:number|string, co2:number}],setItems:Function]} */
  const [Items, setItems] = useState([]);
  const [SheetContent, setSheetContent] = useState({
    name: "Chargement",
    quantity: 0,
    score: 0,
    co2: 0,
    id: "",
    image: "",
    buttonInvisible: false,
    details:{adjustments:{origins_of_ingredients:{epi_value:0}, packaging:{value:0}, production_system:{value:0}}, agribalyse:{value:0}},
  });

  useEffect(() => { //Puisque Items est passé en argument dans le tableau, à chaque fois qu'Items changera, use Effect sera appelé et le composant sera re-rendu
    let notes = [];
    for (let index = 0; index < Items.length; index++) {
      const element = Items[index];
      if (element.score !== null) {
        notes.push(element.score);
      }
    }// Cette boucle met toutes les notes dans un tableau pour pouvoir faire la moyenne par la suite
    const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length; //Calcul de la moyenne
    let moyenne = average(notes).toFixed(1); //Pour avoir un nombre à virgule à la 1ere décimale
    let co2 = 0;
    for (let index = 0; index < Items.length; index++) {
      const element = Items[index];
      co2 += (element.co2 * element.quantity) / 1000;
    } //Cette boucle additionne les valeurs de CO2
    setStats([moyenne, co2.toFixed(2)]); //Pour arrondir à 2 décimale
  }, [Items]);

  /** Récupère la fiche produit d'un objet depuis l'api openfoodfacts
   * @param  {string} id
   */
  async function getItemInfo(id) {
    const response = await fetch(
      `https://fr.openfoodfacts.org/api/v0/product/${id}.json`
    ).catch((err) => {
      Toast.show("😔 Nous n'arrivons pas à nous connecter au serveur", {duration:Toast.durations.LONG}); //Dans le cas où la requête ne fonctionne pas, on affiche un message d'erreur
    });
    const data = await response.json(); //On récupère les données en format json
    return { //Si la donnée n'existe pas (par exemple l'item n'est pas trouvé), on renvoie un objet vide. Ainsi l'application affiche rien
      id: id,
      name:
        data.product.product_name ||
        data.product.product_name_fr ||
        "Produit inconnu",
      quantity: data.product.product_quantity || null,
      score: data.product.ecoscore_score || null,
      co2: data.product.ecoscore_data.agribalyse.co2_total || null,
      image: data.product.image_small_url || null,
      details: data.product.ecoscore_data || null,
    };
  }
  useEffect(() => {
    //Voir plus bas pour l'explication de cette fonction
    (async () => {
      const data = await getArray("caddy");
      setItems(data);
      if (route.params.id !== null) {
        const { id } = route.params;
        const { co2, name, quantity, score, image, details } = await getItemInfo(id);
        setSheetContent({
          co2,
          id,
          name,
          quantity,
          score,
          image,
          details,
          buttonInvisible: false,
        });
        bottomSheetRef.current.expand();
      }
    })();
  }, []);
  /**
   * @param  {string} id
   */
  async function openBottomSheet(id) {
    const { co2, name, quantity, score, image, details } = await getItemInfo(id);
    setSheetContent({
      co2,
      id,
      name,
      quantity,
      score,
      image,
      details,
      buttonInvisible: true,
    });
    bottomSheetRef.current.expand();
  }
  async function clearCaddy() {
    const data = await clearArray("caddy");
    setItems(data);
  }
  async function toDelete(key) {
    const data = await deleteFromArray("caddy", key);
    setItems(data);
  }
  async function addItem({ name, score, quantity, co2, idBarCode }) {
    const data = await addToArray("caddy", {
      name,
      score,
      quantity,
      co2,
      idBarCode,
    });
    setItems(data);
    bottomSheetRef.current.close();
  }
  async function saveCaddy() {
    await addToArray("all_caddy", {date: Date.now(), items: Items});
    setItems(await clearArray("caddy"));
  }
  return (
    <Flex
      backgroundColor="brand.appColor"
      p={3}
      flex={1}
      justify="space-between"
    >
      <PacifiScanHeader />
      <Flex marginBottom={3} marginTop={3} flex={1}>
        <Heading>Statistiques</Heading>
        <Box flex={1}>
          <CaddyStats firstStat={Stats[0]} secondStat={Stats[1]} />
        </Box>
        <Flex justify="space-between" align="center" direction="row">
          <Heading>Mon caddy</Heading>
          <Button onPress={() => {setModalVisible(!ModalVisible)}} backgroundColor="brand.danger">
            Vider
          </Button>
        </Flex>
        <Box marginTop={5} flex={3}>
          <FlatList
            data={Items}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Flex
                p={4}
                justify="center"
                align="center"
                borderRadius={10}
                backgroundColor="brand.p45"
              >
                {" "}
                Votre liste est vide{" "}
              </Flex>
            }
            renderItem={({ item, index }) => (
              <SingleProductCaddy
                idBarCode={item.idBarCode}
                text={item.name}
                score={item.score}
                toDelete={toDelete}
                openBottomSheet={openBottomSheet}
              />
            )}
          ></FlatList>
        </Box>
        <Flex
          marginTop={3}
          width="100%"
          direction="row"
          justify="space-between"
        >
          <Button onPress={saveCaddy} backgroundColor="brand.paccentuation" width="48%">
            J'ai fini
          </Button>
          <Button
            onPress={() => {
              navigation.push("Scan");
            }}
            backgroundColor="brand.p45"
            width="48%"
          >
            J'ajoute
          </Button>
        </Flex>
      </Flex>
      <PacifiScanFooter active="Search" />
      <BottomSheet
        backgroundStyle={{ backgroundColor: "#e9e7fe" }}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["60%"]}
        enablePanDownToClose={true}
      >
        <BottomSheetItem
          addItems={addItem}
          idBarCode={SheetContent.id}
          preview={SheetContent.image}
          quantity={SheetContent.quantity}
          score={SheetContent.score}
          co2={SheetContent.co2}
          name={SheetContent.name}
          buttonInvisible={false || SheetContent.buttonInvisible}
          details={SheetContent.details}
        />
      </BottomSheet>
      <Modal onClose={setModalVisible} isOpen={ModalVisible}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Body p={5} backgroundColor="brand.p45">
            <Heading color="brand.iris100" >Voulez-vous vraiment vider votre caddy ?</Heading>
            <Flex marginTop={2} justify="space-between" align="center" direction="row">
              <Button width="48%" onPress={() => {setModalVisible(!ModalVisible)}} backgroundColor="brand.pbackground">Non</Button>
              <Button width="48%" onPress={() => {clearCaddy();setModalVisible(!ModalVisible)}} backgroundColor="brand.danger">Oui</Button>
            </Flex>

          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Flex>
  );
}

export default Caddy;
/*
Si route.params.id est défini, cela veut dire qu'il a   
 été appelé avec navigation.push()                       
                                                                                                            
            route.params.id = undefined ?                                                       
                         |                               
                         |                               
                Oui      |   Non                         
             ------------|-----------                    
             |                      |                    
             |                      |                    
             |                      |                    
    Récupérer la liste           Ajouter un item à la
    d'item depuis la db          liste puis sync avec
                                 la db et renvoyer le
                                 state               

*/
/* 
 * Infos supplémentaires :
    - Il faut faire attention, le BottomSheet utilise id pour définir le code barre utilisé tandis que dans la liste, idBarCode est utilisé.
    - Une FlatList est utilisée pour afficher les items du caddy. Les données proviennent du state Items. J'utilise un key extractor pour éviter d'avoir un warning récurrent
    sur l'utilisation de clé non définie.
    - Chaque item de la FlatList est un SingleProductCaddy qui contient les données de l'item et les méthodes pour supprimer ou afficher l'item (openBottomSheet et toDelete).
    - Les informations du bottomSheet sont récupérées dans le state SheetContent. Il faut donc faire attention à modifier SheetContent directement puis afficher le BottomSheet.
    - Bottom Sheet 
*/
