import { HStack, Text } from "native-base";

export interface IOrdersProps {
  id: string;
  patrimony: string;
  when: string;
  status: "open" | "close";
}

interface Iprops {
  data: IOrdersProps;
}

export const Orders = ({ data, ...rest }: Iprops) => {
  return (
    <HStack>
      <Text color={"white"} fontSize={"md"}>
        Patrimônio: {data.patrimony}
      </Text>
      <Text color={"white"} fontSize={"md"}>
        Status: {data.status}
      </Text>
      <Text color={"white"} fontSize={"md"}>
        data: {data.when}
      </Text>
    </HStack>
  );
};
