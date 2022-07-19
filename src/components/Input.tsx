import { Input as InputNative, IInputProps } from "native-base";

export const Input = ({ ...rest }: IInputProps) => {
  return (
    <InputNative
      bg="gray.700"
      h="14"
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        bg: "gray.700",
      }}
      {...rest}
    />
  );
};
