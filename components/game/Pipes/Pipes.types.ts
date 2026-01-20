import { Pipes } from "..";

export interface PipesPropsInterface {
    ref?: InstanceType<typeof Pipes>;
}

interface Pipe {
    y: number;
    height: number;
}

export interface PipesStateInterface {
    pipesWidth: number;
    pipesXposition: number;
    topPipe: Pipe;
    bottomPipe: Pipe;
    randomYOffset: number;
}
