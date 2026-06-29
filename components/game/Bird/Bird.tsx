import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import {
    BIRD_HEIGHT,
    BIRD_WIDTH,
    BIRD_INITIAL_X,
    BIRD_INITIAL_Y,
    BIRD_JUMP_SPEED,
    BIRD_GRAVITY,
    BIRD_INITIAL_DROP_SPEED,
} from './consts';
import { PIPE_WIDTH } from '../Pipes/consts';
import { SCREEN_TOP_BORDER } from '@/constants/game';
import type { PipesStateInterface } from '../Pipes/Pipes.types';

export interface BirdRef {
    applyGravity: () => void;
    jump: () => void;
    resetBirdGravity: () => void;
    isBirdDead: (pipes: PipesStateInterface) => boolean;
}

const Bird = forwardRef<BirdRef>(function Bird(_props, ref) {
    const birdY = useSharedValue(BIRD_INITIAL_Y);
    const birdDropSpeed = useSharedValue(BIRD_INITIAL_DROP_SPEED);
    const isDeadRef = useRef(false);

    const animatedStyle = useAnimatedStyle(() => ({
        position: 'absolute' as const,
        height: BIRD_HEIGHT,
        width: BIRD_WIDTH,
        left: BIRD_INITIAL_X,
        top: birdY.value,
    }));

    useImperativeHandle(
        ref,
        () => ({
            applyGravity() {
                birdDropSpeed.value += BIRD_GRAVITY;
                birdY.value += birdDropSpeed.value;
            },
            jump() {
                if (!isDeadRef.current) {
                    birdDropSpeed.value = BIRD_JUMP_SPEED;
                }
            },
            resetBirdGravity() {
                birdY.value = BIRD_INITIAL_Y;
                birdDropSpeed.value = BIRD_INITIAL_DROP_SPEED;
                isDeadRef.current = false;
            },
            isBirdDead(pipes: PipesStateInterface) {
                const { height: screenBottomBorder } = Dimensions.get('window');
                const birdYPos = birdY.value;
                const isHorizontallyAligned =
                    BIRD_INITIAL_X + BIRD_WIDTH > pipes.pipesXposition &&
                    BIRD_INITIAL_X < pipes.pipesXposition + PIPE_WIDTH;

                let isDead = isDeadRef.current;

                if (isHorizontallyAligned) {
                    const topCollision = birdYPos < pipes.topPipeEdge;
                    const bottomCollision =
                        birdYPos + BIRD_HEIGHT > screenBottomBorder - pipes.bottomPipeEdge;
                    if (topCollision || bottomCollision) {
                        isDead = true;
                    }
                }

                if (birdYPos < SCREEN_TOP_BORDER || birdYPos > screenBottomBorder) {
                    isDead = true;
                }

                if (isDead) {
                    isDeadRef.current = true;
                }

                return isDead;
            },
        }),
        [birdY, birdDropSpeed],
    );

    return (
        <Animated.Image
            source={require('@/assets/flappybird.png')}
            style={animatedStyle}
        />
    );
});

export default Bird;
