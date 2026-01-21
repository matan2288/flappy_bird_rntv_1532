export interface BirdStateInterface {
    measurements: BirdMeasurements;
    birdPosition: BirdPosition;
    birdPhysics: BirdPhysics;
    isDead: boolean;
}

export interface BirdMeasurements {
    h: number;
    w: number;
}

export interface BirdPosition {
    x: number;
    y: number;
}

export interface BirdPhysics {
    jumpSpeed: number;
    birdDropSpeed: number;
    gravity: number;
    jumpDelay: number;
}


export interface BirdPropsInterface {
    // Add props here when needed
}
