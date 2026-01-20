import { Component, createRef } from 'react';
import { Image, Dimensions } from "react-native";


class Pipes extends Component<any, any> {
    pipesRefs = {
        top: createRef<Image>(),
        bottom: createRef<Image>()
    };

    constructor(props: any) {
        super(props);
        this.state = {
            pipesWidth: 40,
            pipesXposition: 330,
            topPipe: {
                y: 0,
                height: 300
            },
            bottomPipe: {
                y: Dimensions.get('window').height,
                height: 300
            },
            randomYOffset: Math.random() * 300 - 150
        }


    }


    movePipes(x: number) {
        this.setState((prevState: any) => ({
            ...prevState,
            pipesXposition: prevState.pipesXposition - x
        }));
    }


    resetPipes() {
        this.setState((prevState: any) => ({
            ...prevState,
            pipesXposition: 330
        }));
    }

    render() {
        return (
            <>
                <Image
                    ref={this.pipesRefs.top}
                    source={require("@/assets/toppipe.png")}
                    style={{
                        position: 'absolute',
                        height: 280 + this.state.randomYOffset,
                        width: 80,
                        left: this.state.pipesXposition,  // Control horizontal position
                        top: 0,   // Control vertical position
                    }}
                />
                <Image
                    ref={this.pipesRefs.bottom}
                    source={require("@/assets/bottompipe.png")}
                    style={{
                        position: 'absolute',
                        height: 280 + this.state.randomYOffset,
                        width: 80,
                        left: this.state.pipesXposition,  // Control horizontal position
                        bottom: 0,   // Control vertical position
                    }}
                />
            </>
        );
    }


}

export default Pipes;