import React from "react";

import { THEME } from "./src/styles/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Loading } from "./src/components/Loading";

import { NativeBaseProvider, StatusBar } from "native-base";
import { SingIn } from "./src/screens/SingIn";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="trasparent"
        translucent
      />
      {fontsLoaded ? <SingIn /> : <Loading />}
    </NativeBaseProvider>
  );
}
