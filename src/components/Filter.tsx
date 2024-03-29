import { Button, Text, IButtonProps, useTheme } from "native-base";

interface IBprops extends IButtonProps {
  title: string;
  isActive?: boolean;
  type: "open" | "close";
}

export const Filter = ({ title, isActive = false, type, ...rest }: IBprops) => {
  const { colors } = useTheme();

  const colorType = type === "open" ? colors.secondary[700] : colors.green[300];
  return (
    <Button
      variant={"outline"}
      borderWidth={isActive ? 1 : 0}
      color={colorType}
      bgColor="gray.600"
      flex={1}
      size="sm"
      {...rest}
    >
      <Text
        color={isActive ? colorType : "gray.300"}
        fontSize="xs"
        textTransform={"uppercase"}
      >
        {title}
      </Text>
    </Button>
  );
};
