import { Component, createRef } from 'react';
import { Image, Dimensions } from "react-native";
import { PipesStateInterface } from './Pipes.types';


class Pipes extends Component<{}, PipesStateInterface> {
    pipesRefs = {
        top: createRef<Image>(),
        bottom: createRef<Image>()
    };

    constructor(props: {}) {
        super(props);
        const { width, height } = Dimensions.get('window');
        this.state = {
            pipesXposition: width,
            randomYOffset: (Math.random() * 0.2 - 0.1) * height
        };
    }

    movePipes(x: number) {
        this.setState(prevState => ({
            pipesXposition: prevState.pipesXposition - x
        }));
    }

    resetPipes() {
        const { width } = Dimensions.get('window');
        this.setState({
            pipesXposition: 0
        });
    }

    render() {
        const { height } = Dimensions.get('window');
        return (
            <>
                <Image
                    ref={this.pipesRefs.top}
                    source={require("@/assets/toppipe.png")}
                    style={{
                        position: 'absolute',
                        height: (height * 0.37) + this.state.randomYOffset,
                        width: 80,
                        left: this.state.pipesXposition,
                        top: 0,
                    }}
                />
                <Image
                    ref={this.pipesRefs.bottom}
                    source={require("@/assets/bottompipe.png")}
                    style={{
                        position: 'absolute',
                        height: (height * 0.37) - this.state.randomYOffset,
                        width: 80,
                        left: this.state.pipesXposition,
                        bottom: 0,
                    }}
                />
            </>
        );
    }
}

export default Pipes;