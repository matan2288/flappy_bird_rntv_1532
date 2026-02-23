import { Text, View, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";

type Props = NativeStackScreenProps<RootStackParamList, "UserInfo">;

export default function UserInfoScreen({ navigation }: Props) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>User Info</Text>

            <View style={globalStyles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        globalStyles.button,
                        pressed && globalStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("GameScreen")}
                >
                    <Text style={globalStyles.buttonText}>Start</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        globalStyles.button,
                        globalStyles.buttonSecondary,
                        pressed && globalStyles.buttonPressed,
                    ]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={globalStyles.buttonText}>Back</Text>
                </Pressable>
            </View>
        </View>
    );
}
