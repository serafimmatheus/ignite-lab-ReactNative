import { VStack, Heading, Icon, useTheme } from "native-base";

import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Envelope, Key } from "phosphor-react-native";
import { Button } from "../components/Button";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const SingIn = () => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha!");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((_) => {
        setIsLoading(false);
        navigation.navigate("home");
      })
      .catch((error) => {
        setIsLoading(false);
        return Alert.alert("Error", "Email/Senha inválido!");
      });
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={"8"} pt="24">
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt="20" mb="6">
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb="4"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml="3" />
        }
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        mb="4"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml="3" />}
        type="password"
        onChangeText={setPassword}
      />

      <Button
        isLoading={isLoading}
        title="Enviar"
        width="full"
        onPress={handleSignIn}
      />
    </VStack>
  );
};
