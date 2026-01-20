import React, { Component, createRef } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Dimensions } from 'react-native';

interface BirdState {
    measurements: {
        h: number;
        w: number;
    };
    birdPosition: {
        x: number;
        y: number;
    };
    birdPhysics: {
        jumpSpeed: number;
        birdDropSpeed: number;
        gravity: number;
        jumpDelay: number;
    };
    isDead: boolean;
}

class Bird extends Component<{}, BirdState> {
    gameLoop: ReturnType<typeof setInterval> | null = null;
    imageRef = createRef<Image>();

    constructor(props: any) {
        super(props);
        this.state = {
            measurements: {
                h: 30,
                w: 35,
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


    getPosition = () => {
        this.imageRef.current?.measure((x, y, width, height, pageX, pageY) => {
            console.log('Relative to parent:', { x, y, width, height });
            console.log('Absolute on screen:', { pageX, pageY });
            // Get correct screen height from Dimensions API

            const { height: screenHeight } = Dimensions.get('window');
            console.log('Screen height:', screenHeight);

            this.setState({
                measurements: { w: width, h: height },
                birdPosition: { x: pageX, y: pageY },
            });
        });
    };

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

    jump = () => {
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

    isBirdDead() {
        const { height: screenHeight } = Dimensions.get('window');
        if (this.state.birdPosition.y < 0 || this.state.birdPosition.y > screenHeight) {
            this.setState({
                isDead: true
            });
        } else {
            this.setState({
                isDead: false
            });
        }

        return this.state.isDead;
    }

    render() {
        return (
            <Image
                ref={this.imageRef}
                source={require('@/assets/flappybird.png')}
                style={{
                    position: 'absolute',
                    height: this.state.measurements.h,
                    width: this.state.measurements.w,
                    left: this.state.birdPosition.x,  // Control horizontal position
                    top: this.state.birdPosition.y,   // Control vertical position
                }}
                onLayout={this.getPosition}
            />
        );
    }
}


export default Bird;
