import { Text, TextInput, View, Pressable } from "react-native";
import { useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";
import { useUserStore } from '@/store';

type Props = NativeStackScreenProps<RootStackParamList, "UserInfo">;

export default function UserInfoScreen({ navigation }: Props) {
    const { username, registerUsername, resetUserDetails } = useUserStore(state => state);

    useEffect(() => {
        resetUserDetails();
    }, []);

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>User Info</Text>

            <View style={globalStyles.buttonContainer}>
                <Text style={{ marginVertical: 8, color: 'white' }}>Enter your name:</Text>
                <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#ccc'
                }}>
                    <TextInput
                        placeholder="Your name"
                        style={{ height: 40 }}
                        value={username}
                        onChangeText={registerUsername}
                        autoCapitalize="words"
                    />
                </View>

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
