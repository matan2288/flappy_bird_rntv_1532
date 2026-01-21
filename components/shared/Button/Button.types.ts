import { PressableProps, StyleProp, ViewStyle, TextStyle } from "react-native";

export interface ButtonProps extends Omit<PressableProps, "style"> {
    label: string;
    variant?: "primary" | "secondary" | "tertiary";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}
