import { Text, View, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Scoreboard">;

export default function ScoreboardScreen({ navigation }: Props) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Scoreboard</Text>

            <View style={globalStyles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        globalStyles.button,
                        pressed && globalStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={globalStyles.buttonText}>Back to home</Text>
                </Pressable>
            </View>
        </View>
    );
}
