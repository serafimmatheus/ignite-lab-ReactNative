import { useNavigation } from "@react-navigation/native";
import {
  HStack,
  IconButton,
  useTheme,
  StyledProps,
  Heading,
} from "native-base";
import { CaretLeft } from "phosphor-react-native";

interface IProps extends StyledProps {
  title: string;
}

export const Header = ({ title, ...rest }: IProps) => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const handleBackHome = () => {
    navigation.goBack();
  };

  return (
    <HStack
      w={"full"}
      justifyContent={"space-between"}
      alignItems="center"
      bg={"gray.600"}
      pt={12}
      pb={5}
      px={6}
      {...rest}
    >
      <IconButton
        onPress={handleBackHome}
        icon={<CaretLeft size={24} color={colors.gray[200]} />}
      />

      <Heading
        color="gray.100"
        textAlign={"center"}
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
};
