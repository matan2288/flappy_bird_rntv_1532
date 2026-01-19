import { StyleSheet, Text, View, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/routes";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function YourScoreScreen({ route, navigation }: Props) {
    const { itemId, title } = route.params;

    return (
        <View style={styles.container}>
            <Text>🏠 Test213</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f23",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
  
});
