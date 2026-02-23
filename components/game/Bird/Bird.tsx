import { Component, createRef } from 'react';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { BirdPropsInterface, BirdStateInterface } from './Bird.types';
class Bird extends Component<BirdPropsInterface, BirdStateInterface> {
    gameLoop: ReturnType<typeof setInterval> | null = null;
    birdRef = createRef<Image>();

    constructor(props: BirdPropsInterface) {
        super(props);
        this.state = {
            measurements: {
                h: 35,
                w: 40,
            },
            birdPosition: {
                x: 100,
                y: 100
            },
            birdPhysics: {
                jumpSpeed: -7.5,
                birdDropSpeed: 0,
                gravity: 0.2,
                jumpDelay: 0,
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
                x: 100,
                y: 100
            },
            birdPhysics: {
                ...this.state.birdPhysics,
                birdDropSpeed: 0,
            },
            isDead: false
        });
    }

    isBirdDead(pipes: any) {
        const { height: screenHeight } = Dimensions.get('window');
        const birdX = this.state.birdPosition.x;
        const pipeX = pipes?.pipesXposition;
        const pipeWidth = 80;

        const horizontallyAligned = birdX + 40 > pipeX && birdX < pipeX + pipeWidth;

        if (horizontallyAligned) {
            let topCollision = this.state.birdPosition.y < pipes?.topPipeEdge;
            let bottomCollision = this.state.birdPosition.y + 35 > screenHeight - pipes?.bottomPipeEdge;

            if (topCollision || bottomCollision) {
                this.setState({
                    isDead: true
                });
            }
        }

        if (this.state.birdPosition.y < 0 || this.state.birdPosition.y > screenHeight) {
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
