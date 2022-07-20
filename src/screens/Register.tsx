import { VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Register = () => {
  return (
    <VStack flex={1} p="6" bg="gray.600">
      <Header title="Nova solicitação" />

      <Input mt={4} placeholder="Numero do patrimônio" />
      <Input
        multiline
        textAlignVertical="top"
        mt={4}
        flex={1}
        placeholder="Descrição do problema"
      />

      <Button title="Cadastrar" mt="5" />
    </VStack>
  );
};
