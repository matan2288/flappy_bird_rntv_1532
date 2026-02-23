import { Component, createRef } from 'react';
import { Image, Dimensions } from "react-native";
import { PipesStateInterface } from './Pipes.types';
import { PIPE_HEIGHT_RATIO, RANDOM_OFFSET_MAX, RANDOM_OFFSET_MIN, PIPE_WIDTH, TOP_PIPE_DRAW_START, BOTTOM_PIPE_DRAW_START, PIPE_RESET_X_POSITION } from './pipesConsts';


class Pipes extends Component<{}, PipesStateInterface> {
    pipesRefs = {
        top: createRef<Image>(),
        bottom: createRef<Image>()
    };

    constructor(props: {}) {
        super(props);
        const { width, height } = Dimensions.get('window');
        const randomYOffset = (Math.random() * RANDOM_OFFSET_MAX - RANDOM_OFFSET_MIN) * height;

        this.state = {
            topPipeEdge: (height * PIPE_HEIGHT_RATIO) + randomYOffset,
            bottomPipeEdge: (height * PIPE_HEIGHT_RATIO) - randomYOffset,
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
        this.setState({
            pipesXposition: PIPE_RESET_X_POSITION
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
                        width: PIPE_WIDTH,
                        left: this.state.pipesXposition,
                        top: TOP_PIPE_DRAW_START,
                    }}
                />
                <Image
                    ref={this.pipesRefs.bottom}
                    source={require("@/assets/bottompipe.png")}
                    style={{
                        position: 'absolute',
                        height: this.getBottomPipeEdge(),
                        width: PIPE_WIDTH,
                        left: this.state.pipesXposition,
                        bottom: BOTTOM_PIPE_DRAW_START,
                    }}
                />
            </>
        );
    }
}

export default Pipes;