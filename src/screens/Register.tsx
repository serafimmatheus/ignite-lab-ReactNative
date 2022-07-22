import { useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const handleNewOrdersRegister = () => {
    if (!patrimony || !description) {
      return Alert.alert(
        "Erro",
        "Patrimonio e descrição são campos obrigatóros!"
      );
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then((_) => {
        setIsLoading(false);
        Alert.alert("Solicitação", "Solicitação registrada com sucesso!");
        navigation.goBack();
      })
      .catch((_) => {
        setIsLoading(false);
        Alert.alert("Erro", "Algo deu errado.");
      });
  };

  return (
    <VStack flex={1} p="6" bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        onChangeText={setPatrimony}
        mt={4}
        placeholder="Numero do patrimônio"
      />
      <Input
        multiline
        textAlignVertical="top"
        mt={4}
        flex={1}
        placeholder="Descrição do problema"
        onChangeText={setDescription}
      />

      <Button
        isLoading={isLoading}
        onPress={handleNewOrdersRegister}
        title="Cadastrar"
        mt="5"
      />
    </VStack>
  );
};
