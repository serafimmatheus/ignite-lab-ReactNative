import {
  HStack,
  VStack,
  IconButton,
  useTheme,
  Heading,
  Text,
  FlatList,
} from "native-base";
import { SignOut } from "phosphor-react-native";
import { useState } from "react";

import Logo from "../assets/logo_secondary.svg";
import { Filter } from "../components/Filter";
import { Orders, IOrdersProps } from "../components/Orders";

export const Home = () => {
  const [statusSelected, setStatusSelected] = useState<"open" | "close">(
    "open"
  );

  const [orders, setOrders] = useState<IOrdersProps[]>([
    {
      id: "1",
      patrimony: "123456",
      when: "18/07/2022 às 15:43",
      status: "open",
    },
    {
      id: "2",
      patrimony: "324512",
      when: "15/07/2022 às 12:20",
      status: "close",
    },
    {
      id: "3",
      patrimony: "135689",
      when: "18/07/2022 às 14:51",
      status: "open",
    },
    {
      id: "4",
      patrimony: "865457",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "5",
      patrimony: "747777",
      when: "17/07/2022 às 11:23",
      status: "close",
    },
    {
      id: "6",
      patrimony: "222534",
      when: "18/07/2022 às 10:11",
      status: "open",
    },
  ]);

  const { colors } = useTheme();
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
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w={"full"}
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Heading color="gray.100">Meus Chamados</Heading>

          <Text color={"gray.200"}>3</Text>
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

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Orders data={item} />}
        />
      </VStack>
    </VStack>
  );
};
