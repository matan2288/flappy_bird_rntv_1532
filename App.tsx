import { ImageBackground } from "react-native";
import RootNavigator from "./navigation/RootNavigator";
import { globalStyles } from "@/theme/globalStyles";

export default function App() {
    return (
        <ImageBackground
            source={require("./assets/flappybirdbg.png")}
            style={globalStyles.background}
            resizeMode="stretch"
        >
            <RootNavigator />
        </ImageBackground>
    );
}
