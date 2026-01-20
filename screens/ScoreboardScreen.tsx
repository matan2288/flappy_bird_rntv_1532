import { Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function ScoreboardScreen({ route, navigation }: Props) {
    const { itemId, title } = route.params;

    return (
        <View style={globalStyles.container}>
            <Text>🏠 Test213</Text>
        </View>
    );
}
