import { Text, View, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";
import { useUserStore } from '@/store';


type Props = NativeStackScreenProps<RootStackParamList, "YourScore">;

export default function YourScoreScreen({ navigation }: Props) {
    const { username, score } = useUserStore(state => state)

    return (
        <View style={globalStyles.container}>

            <Text style={globalStyles.buttonText}>{username}Your Score is:</Text>
            <Text style={globalStyles.title}>{score}</Text>

            <View style={globalStyles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        globalStyles.button,
                        pressed && globalStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("Scoreboard")}
                >
                    <Text style={globalStyles.buttonText}>Continue</Text>
                </Pressable>
            </View>
        </View>
    );
}
