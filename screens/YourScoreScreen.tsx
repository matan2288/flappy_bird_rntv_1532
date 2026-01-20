import { Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";

type Props = NativeStackScreenProps<RootStackParamList, "YourScore">;

export default function YourScoreScreen({ navigation }: Props) {
    return (
        <View style={globalStyles.container}>
            <Text>🎯 Your Score</Text>
        </View>
    );
}
