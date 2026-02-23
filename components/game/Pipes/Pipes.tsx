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
        const randomYOffset = (Math.random() * 0.2 - 0.1) * height;

        this.state = {
            topPipeEdge: (height * 0.37) + randomYOffset,
            bottomPipeEdge: (height * 0.37) - randomYOffset,
            pipesXposition: width,
            randomYOffset: randomYOffset
        };
    }

    getTopPipeEdge() {
        return this.state.topPipeEdge;
    }

    getBottomPipeEdge() {
        return this.state.bottomPipeEdge;
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
        return (
            <>
                <Image
                    ref={this.pipesRefs.top}
                    source={require("@/assets/toppipe.png")}
                    style={{
                        position: 'absolute',
                        height: this.getTopPipeEdge(),
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
                        height: this.getBottomPipeEdge(),
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