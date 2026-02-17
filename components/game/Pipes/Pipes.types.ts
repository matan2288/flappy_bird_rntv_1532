import { Pipes } from "..";

export interface PipesPropsInterface {
    ref?: InstanceType<typeof Pipes>;
}

export interface PipesStateInterface {
    pipesXposition: number;
    randomYOffset: number;
}
