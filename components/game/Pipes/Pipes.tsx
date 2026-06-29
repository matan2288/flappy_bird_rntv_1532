import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import {
    PIPE_HEIGHT_RATIO,
    RANDOM_OFFSET_MAX,
    RANDOM_OFFSET_MIN,
    PIPE_WIDTH,
    TOP_PIPE_DRAW_START,
    BOTTOM_PIPE_DRAW_START,
    PIPE_RESET_X_POSITION,
} from './consts';
import type { PipesStateInterface } from './Pipes.types';

export interface PipesRef {
    movePipes: (x: number) => void;
    resetPipes: () => void;
    getState: () => PipesStateInterface;
}

const Pipes = forwardRef<PipesRef>(function Pipes(_props, ref) {
    const { width, height } = Dimensions.get('window');
    const pipeGeometry = useMemo(() => {
        const randomYOffset = (Math.random() * RANDOM_OFFSET_MAX - RANDOM_OFFSET_MIN) * height;
        return {
            topPipeEdge: height * PIPE_HEIGHT_RATIO + randomYOffset,
            bottomPipeEdge: height * PIPE_HEIGHT_RATIO - randomYOffset,
            randomYOffset,
            initialX: width,
        };
    }, [width, height]);

    const pipesX = useSharedValue(pipeGeometry.initialX);

    const topStyle = useAnimatedStyle(() => ({
        position: 'absolute' as const,
        height: pipeGeometry.topPipeEdge,
        width: PIPE_WIDTH,
        left: pipesX.value,
        top: TOP_PIPE_DRAW_START,
    }));

    const bottomStyle = useAnimatedStyle(() => ({
        position: 'absolute' as const,
        height: pipeGeometry.bottomPipeEdge,
        width: PIPE_WIDTH,
        left: pipesX.value,
        bottom: BOTTOM_PIPE_DRAW_START,
    }));

    useImperativeHandle(
        ref,
        () => ({
            movePipes(x: number) {
                pipesX.value -= x;
            },
            resetPipes() {
                pipesX.value = PIPE_RESET_X_POSITION;
            },
            getState(): PipesStateInterface {
                return {
                    pipesXposition: pipesX.value,
                    topPipeEdge: pipeGeometry.topPipeEdge,
                    bottomPipeEdge: pipeGeometry.bottomPipeEdge,
                    randomYOffset: pipeGeometry.randomYOffset,
                };
            },
        }),
        [pipesX, pipeGeometry],
    );

    return (
        <>
            <Animated.Image source={require('@/assets/toppipe.png')} style={topStyle} />
            <Animated.Image source={require('@/assets/bottompipe.png')} style={bottomStyle} />
        </>
    );
});

export default Pipes;
