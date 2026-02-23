import { Component, createRef } from 'react';
import { Image, Dimensions } from 'react-native';
import { BirdPropsInterface, BirdStateInterface } from './Bird.types';
import { 
    BIRD_HEIGHT, 
    BIRD_WIDTH, 
    BIRD_INITIAL_X, 
    BIRD_INITIAL_Y, 
    BIRD_JUMP_SPEED, 
    BIRD_GRAVITY, 
    BIRD_INITIAL_DROP_SPEED, 
    BIRD_JUMP_DELAY 
} from './birdConsts';
import { PIPE_WIDTH } from '../Pipes/pipesConsts';
import { SCREEN_TOP_BORDER } from '@/screens/GameScreen/gameScreenConsts';

class Bird extends Component<BirdPropsInterface, BirdStateInterface> {
    gameLoop: ReturnType<typeof setInterval> | null = null;
    birdRef = createRef<Image>();

    constructor(props: BirdPropsInterface) {
        super(props);
        this.state = {
            measurements: {
                h: BIRD_HEIGHT,
                w: BIRD_WIDTH,
            },
            birdPosition: {
                x: BIRD_INITIAL_X,
                y: BIRD_INITIAL_Y
            },
            birdPhysics: {
                jumpSpeed: BIRD_JUMP_SPEED,
                birdDropSpeed: BIRD_INITIAL_DROP_SPEED,
                gravity: BIRD_GRAVITY,
                jumpDelay: BIRD_JUMP_DELAY,
            },
            isDead: false
        };
    }

    applyGravity() {
        this.setState(prevState => {
            const newDropSpeed = prevState.birdPhysics.birdDropSpeed + prevState.birdPhysics.gravity;
            const newY = prevState.birdPosition.y + newDropSpeed;
            return {
                ...prevState,
                birdPosition: {
                    ...prevState.birdPosition,
                    y: newY,
                },
                birdPhysics: {
                    ...prevState.birdPhysics,
                    birdDropSpeed: newDropSpeed,
                },
            };
        });
    }

    jump() {
        if (!this.state.isDead) {
            this.setState(prevState => ({
                birdPhysics: {
                    ...prevState.birdPhysics,
                    birdDropSpeed: prevState.birdPhysics.jumpSpeed,
                },
            }));
        }
    };

    resetBirdGravity() {
        this.setState({
            birdPosition: {
                x: BIRD_INITIAL_X,
                y: BIRD_INITIAL_Y
            },
            birdPhysics: {
                ...this.state.birdPhysics,
                birdDropSpeed: BIRD_INITIAL_DROP_SPEED,
            },
            isDead: false
        });
    }

    isBirdDead(pipes: any) {
        const { height: screenBottomBorder } = Dimensions.get('window');
        const isHorizontallyAligned = this.state.birdPosition.x + BIRD_WIDTH > pipes?.pipesXposition && this.state.birdPosition.x < pipes?.pipesXposition + PIPE_WIDTH;

        if (isHorizontallyAligned) {
            let topCollision = this.state.birdPosition.y < pipes?.topPipeEdge;
            let bottomCollision = this.state.birdPosition.y + BIRD_HEIGHT > screenBottomBorder - pipes?.bottomPipeEdge;

            if (topCollision || bottomCollision) {
                this.setState({
                    isDead: true
                });
            }
        }

        if (this.state.birdPosition.y < SCREEN_TOP_BORDER || this.state.birdPosition.y > screenBottomBorder) {
            this.setState({
                isDead: true
            });
        }

        return this.state.isDead;
    }

    render() {
        return (
            <Image
                ref={this.birdRef}
                source={require('@/assets/flappybird.png')}
                style={{
                    position: 'absolute',
                    height: this.state.measurements.h,
                    width: this.state.measurements.w,
                    left: this.state.birdPosition.x,
                    top: this.state.birdPosition.y,
                }}
            />
        );
    }
}


export default Bird;
