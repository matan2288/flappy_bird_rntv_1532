export interface PipePosition {
    x: number;
    gapY: number;
}

export interface PipesProps {
    topPipeHeight?: number;
    bottomPipeHeight?: number;
    gapSize?: number;
    speed?: number;
}

export interface PipesState {
    pipes: PipePosition[];
}
