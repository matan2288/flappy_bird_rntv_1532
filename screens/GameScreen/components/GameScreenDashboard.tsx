import { View } from "react-native";
import { useEffect } from "react";
import { globalStyles } from "@/theme/globalStyles";


type Props = {
    onRestart: () => void;
    onStop: () => void;
    onJump: () => void;
};



export  const  GameScreenDashbaord = (props: Props) => {
    useEffect(() => {

    }, []);
    return (
        <View style={globalStyles.container}>
            <button
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 1000,
                    padding: 8,
                    backgroundColor: '#eee',
                    border: '1px solid #aaa',
                    borderRadius: 4,
                    cursor: 'pointer',
                }}
                onClick={() => props.onJump()}
            >
                Jump
            </button>
            <button
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 60,
                    zIndex: 1000,
                    padding: 8,
                    backgroundColor: '#eee',
                    border: '1px solid #aaa',
                    borderRadius: 4,
                    cursor: 'pointer',
                }}
                onClick={() => props.onStop()}
            >
                Stop
            </button>
            <button
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 110,
                    zIndex: 1000,
                    padding: 8,
                    backgroundColor: '#eee',
                    border: '1px solid #aaa',
                    borderRadius: 4,
                    cursor: 'pointer',
                }}
                onClick={() => props.onRestart()}
            >
                Restart
            </button>
        </View>
    );
}
