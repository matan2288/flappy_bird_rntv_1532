import { View, Text } from "react-native";
import { globalStyles } from "@/theme/globalStyles";
import { Bird, Pipes } from "@/components";
import { useRef, useEffect, useState, createRef } from "react";
import { ActionBar } from "./components/ActionBar";
import { v4 as uuidv4 } from "uuid";
import type { GameScreenProps, BirdRef, PipesRef } from "./GameScreen.types";
import { isEmpty, isNumber } from "lodash";
import { PIPE_SPAWN_TIMER_LIMIT, PIPE_SPAWN_INITIAL, PIPE_X_MOVEMENT_SPEED, PIPE_OFFSCREEN_REMOVAL } from "./consts";
import { BIRD_WIDTH, BIRD_INITIAL_X } from "@/components/game/Bird/consts";
import { PIPE_WIDTH } from "@/components/game/Pipes/consts";


export default function GameScreen(props: GameScreenProps) {
    const birdRef = useRef<BirdRef>(null);
    const pipesRef = useRef<PipesRef>(null);
    const gameLoop = useRef<NodeJS.Timeout | null>(null);

    const [pipesList, setPipesList] = useState<{ id: string; ref: React.RefObject<PipesRef | null> }[]>([]); // For re rendering the component for new pipes
    const [difficulty, setDifficulty] = useState<number>(3);
    const [score, setScore] = useState<number>(0);

    let pipeBeforeBird = null;
    let pipeSpwan = PIPE_SPAWN_INITIAL;
    let pipesListRef = useRef<{ id: string; ref: React.RefObject<PipesRef | null> }[]>([]);

    const startGameLoop = () => {
        if (gameLoop.current) return;

        gameLoop.current = setInterval(() => {
            birdRef.current?.applyGravity();

            // Pipe movement logic
            pipesListRef.current.forEach(pipe => {
                pipe.ref.current?.movePipes(PIPE_X_MOVEMENT_SPEED);
            });

            pipeSpwan++;


            // Pipes removal logic
            if (!isEmpty(pipesListRef.current)) {
                const firstPipeX = pipesListRef.current[0].ref.current?.state?.pipesXposition;
                const isHorizontallyAligned = isNumber(firstPipeX) && BIRD_INITIAL_X + BIRD_WIDTH > firstPipeX && BIRD_INITIAL_X < firstPipeX + PIPE_WIDTH;

                if (!isEmpty(pipesListRef.current[0].ref.current?.state) && isHorizontallyAligned) {
                    pipeBeforeBird = pipesListRef.current[0].ref.current.state;

                    if (birdRef.current?.isBirdDead(pipeBeforeBird)) {
                        stopGameLoop();
                    } else {
                        setScore(prevScore => prevScore + 7);
                    }
                }

                if (firstPipeX !== undefined && firstPipeX < PIPE_OFFSCREEN_REMOVAL) {
                    pipesListRef.current = pipesListRef.current.slice(1);
                    setPipesList([...pipesListRef.current]);
                }
            }

            //Pipes spwan logic
            if (pipeSpwan === PIPE_SPAWN_TIMER_LIMIT) {
                const newPipe = { id: uuidv4(), ref: createRef<PipesRef>() };
                pipesListRef.current = [...pipesListRef.current, newPipe];
                setPipesList([...pipesListRef.current]);
                pipeSpwan = PIPE_SPAWN_INITIAL;
            }

            if (score === 50) {
                setDifficulty(4);
            }


        }, 16);
    };


    const restartGameLoop = () => {
        stopGameLoop();
        birdRef.current?.resetBirdGravity();
        pipesRef.current?.resetPipes();
        pipesListRef.current = [];
        setPipesList([]); 
        startGameLoop();
    }

    const stopGameLoop = () => {
        if (gameLoop.current) {
            clearInterval(gameLoop.current);
            gameLoop.current = null;
        }
    };

    useEffect(() => {
        startGameLoop();

        return () => {
            stopGameLoop();
        };
    }, []);

    return (
        <View style={[globalStyles.container, { overflow: 'hidden' }]}>
            {pipesList.map((pipe) => (
                <Pipes key={pipe.id} ref={pipe.ref} />
            ))}
            <ActionBar
                onRestart={restartGameLoop}
                onStop={stopGameLoop}
                onJump={() => birdRef.current?.jump()}
            />
            <Text style={{ marginBottom: 4, fontWeight: 'bold', color: 'white' }}>Difficulty: {difficulty} score: {score}</Text>
            <Bird ref={birdRef} />
        </View>
    );
}

