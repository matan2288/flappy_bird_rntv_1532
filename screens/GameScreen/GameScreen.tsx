import { View, Text } from "react-native";
import { globalStyles } from "@/theme/globalStyles";
import { Bird, Pipes } from "@/components";
import { useRef, useEffect, useState, createRef } from "react";
import { ActionBar } from "./components/ActionBar";
import { v4 as uuidv4 } from "uuid";
import type { GameScreenProps, BirdRef, PipesRef } from "./GameScreen.types";


export default function GameScreen(props: GameScreenProps) {
    const birdRef = useRef<BirdRef>(null);
    const pipesRef = useRef<PipesRef>(null);
    const gameLoop = useRef<NodeJS.Timeout | null>(null);

    const pipesListRef = useRef<{ id: string; ref: React.RefObject<PipesRef | null> }[]>([]);
    const [pipesList, setPipesList] = useState<{ id: string; ref: React.RefObject<PipesRef | null> }[]>([]);
    const [difficulty, setDifficulty] = useState<number>(3);
    const [score, setScore] = useState<number>(0);

    const pipeSpwanTimerLimit = 120;
    let pipeSpwan = 0;

    const startGameLoop = () => {
        if (gameLoop.current) return;

        gameLoop.current = setInterval(() => {
            birdRef.current?.applyGravity();

            // Pipe movement logic
            pipesListRef.current.forEach(pipe => {
                pipe.ref.current?.movePipes(3);
            });

            pipeSpwan++;

            setScore(score + 7);
            // Pipes removal logic
            if (pipesListRef.current.length > 0) {
                const firstPipeX = pipesListRef.current[0].ref.current?.state.pipesXposition;
                if (firstPipeX !== undefined && firstPipeX < -80) {
                    pipesListRef.current = pipesListRef.current.slice(1);
                    setPipesList([...pipesListRef.current]);
                }
            }

            //Pipes spwan logic
            if (pipeSpwan === pipeSpwanTimerLimit) {
                const newPipesRef = createRef<PipesRef>();
                const newPipe = { id: uuidv4(), ref: newPipesRef };
                pipesListRef.current = [...pipesListRef.current, newPipe];
                setPipesList([...pipesListRef.current]);
                pipeSpwan = 0;
            }

            if (score === 50) {
                setDifficulty(4);
            }

            if (birdRef.current?.isBirdDead() && gameLoop.current) {
                stopGameLoop();
            }
        }, 16);
    };


    const restartGameLoop = () => {
        stopGameLoop();
        birdRef.current?.resetBirdGravity();
        pipesRef.current?.resetPipes();
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

