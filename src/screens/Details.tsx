import { useRoute } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import { Header } from "../components/Header";

interface IPropsRoute {
  orderId: string;
}

export const Details = () => {
  const route = useRoute();

  const { orderId } = route.params as IPropsRoute;

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitações" />
      <Text color={"white"}>{orderId}</Text>
    </VStack>
  );
};
