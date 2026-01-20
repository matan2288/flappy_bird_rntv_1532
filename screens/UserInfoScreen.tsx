import { Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/routes";
import { globalStyles } from "@/theme/globalStyles";

type Props = NativeStackScreenProps<RootStackParamList, "UserInfo">;

export default function UserInfoScreen({ navigation }: Props) {
    return (
        <View style={globalStyles.container}>
            <Text>👤 User Info</Text>
        </View>
    );
}
