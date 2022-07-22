import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, VStack, HStack, useTheme, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { IOrdersProps } from "../components/Orders";
import firestore from "@react-native-firebase/firestore";
import { firestoreDateFormated } from "../utils/firestoreDateFormated";
import { Loading } from "../components/Loading";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
} from "phosphor-react-native";
import { CardDatails } from "../components/CardDatails";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";

interface IPropsRoute {
  orderId: string;
}

interface IpropsOrderDetails extends IOrdersProps {
  description: string;
  solution: string;
  closed: string;
}

export const Details = () => {
  const route = useRoute();

  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<IpropsOrderDetails>(
    {} as IpropsOrderDetails
  );

  const { colors } = useTheme();

  const { orderId } = route.params as IPropsRoute;

  useEffect(() => {
    firestore()
      .collection("orders")
      .doc(orderId)
      .get()
      .then((item) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = item.data();

        const closed = closed_at ? firestoreDateFormated(closed_at) : null;

        setOrder({
          id: item.id,
          patrimony,
          description,
          status,
          when: firestoreDateFormated(created_at),
          closed,
          solution,
        });

        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  const navigation = useNavigation();

  const handleOrderClose = () => {
    setIsLoading(true);

    if (!solution) {
      setIsLoading(false);
      return Alert.alert("Erro", "Inserir compo de solução.");
    }

    firestore()
      .collection("orders")
      .doc(orderId)
      .update({
        status: "close",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then((_) => {
        setIsLoading(false);
        navigation.goBack();
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        Alert.alert("Erro", "Não foi possivel fechar essa solicitação.");
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitações" />

      <HStack bg="gray.500" justifyContent={"center"} p={4}>
        {order.status === "close" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize={"sm"}
          color={
            order.status === "close" ? colors.green[300] : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "close" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx="5" showsVerticalScrollIndicator={false}>
        <CardDatails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />

        <CardDatails
          title="descrição do problema"
          description={order.description}
          icon={Clipboard}
        />

        <CardDatails
          title="solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
            />
          )}
        </CardDatails>

        {order.status === "open" && (
          <Button
            isLoading={isLoading}
            onPress={handleOrderClose}
            mt="5"
            title="Encerrar"
          />
        )}
      </ScrollView>
    </VStack>
  );
};
