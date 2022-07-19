import { Button as NativeBaseButton, IButtonProps, Heading } from "native-base";

interface IBProps extends IButtonProps {
  title: string;
}

export function Button({ title, ...rest }: IBProps) {
  return (
    <NativeBaseButton
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded={"sm"}
      _pressed={{
        bg: "green.500",
      }}
      {...rest}
    >
      <Heading color={"white"} fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
