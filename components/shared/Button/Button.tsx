import { Pressable, Text } from "react-native";
import type { ButtonProps } from "./Button.types";

export default function Button({ label, onPress, disabled }: ButtonProps) {
    return (
        <Pressable onPress={onPress} disabled={disabled}>
            <Text>{label}</Text>
        </Pressable>
    );
}
