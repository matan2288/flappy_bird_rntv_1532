import RootNavigator from "./navigation/RootNavigator";


// Define the type for our navigation params
export type RootStackParamList = {
    Home: undefined;
    Details: { itemId: number; title: string };
    Settings: undefined;
};



export default function App() {
    return (
        <>
            <RootNavigator />
        </>
    );
}
