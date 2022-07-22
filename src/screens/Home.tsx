import { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  IconButton,
  useTheme,
  Heading,
  Text,
  FlatList,
  Center,
} from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Logo from "../assets/logo_secondary.svg";
import { Filter } from "../components/Filter";
import { Button } from "../components/Button";
import { Orders, IOrdersProps } from "../components/Orders";
import { Alert } from "react-native";
import { firestoreDateFormated } from "../utils/firestoreDateFormated";
import { Loading } from "../components/Loading";

export const Home = () => {
  const [statusSelected, setStatusSelected] = useState<"open" | "close">(
    "open"
  );

  const handleLogout = () => {
    auth()
      .signOut()
      .catch((e) => Alert.alert("Error", `${e}`));
  };

  const [orders, setOrders] = useState<IOrdersProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const handleNewOrder = () => {
    navigation.navigate("register");
  };

  const handleOpenDetatils = (orderId: string) => {
    navigation.navigate("details", { orderId });
  };

  const { colors } = useTheme();

  useEffect(() => {
    setIsLoading(true);

    const subscrible = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, created_at, status } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: firestoreDateFormated(created_at),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscrible;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        alignItems="center"
        bg={"gray.600"}
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          onPress={handleLogout}
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w={"full"}
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Heading color="gray.100">Solicitações</Heading>

          <Text color={"gray.200"}>{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title="Abertos"
            type="open"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            title="Finalizados"
            type="close"
            onPress={() => setStatusSelected("close")}
            isActive={statusSelected === "close"}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Orders data={item} onPress={() => handleOpenDetatils(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text
                  color="gray.300"
                  fontSize={"xl"}
                  mt="6"
                  textAlign={"center"}
                >
                  Você ainda não possui solicitaçoẽs{" "}
                  {statusSelected === "open" ? "em aberto" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="Nova solicitação" mt={4} onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};
