import { View } from "react-native";
import { globalStyles } from "@/theme/globalStyles";
import { Bird, Pipes } from "@/components";
import { useRef, useEffect, useState, createRef } from "react";
import { Dashboard } from "./components/Dashboard";
import type { GameScreenProps, BirdRef, PipesRef } from "./GameScreen.types";


export default function GameScreen(props: GameScreenProps) {
    const birdRef = useRef<BirdRef>(null);
    const pipesRef = useRef<PipesRef>(null);
    const gameLoop = useRef<NodeJS.Timeout | null>(null);
    // Add a counter ref
    const pipeIdCounter = useRef(0);

    // Change the data structure to include an id
    const pipesListRef = useRef<{ id: number; ref: React.RefObject<PipesRef | null> }[]>([]);
    const [pipesList, setPipesList] = useState<{ id: number; ref: React.RefObject<PipesRef | null> }[]>([]);

    const pipeSpwanTimerLimit = 120;
    let pipeSpwan = 0;

    const startGameLoop = () => {
        if (gameLoop.current) return; // Prevent multiple loops

        gameLoop.current = setInterval(() => {
            birdRef.current?.applyGravity();

            // Pipe movement logic
            pipesListRef.current.forEach(pipe => {
                pipe.ref.current?.movePipes(3);
            });

            pipeSpwan++;

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
                const newPipe = { id: pipeIdCounter.current++, ref: newPipesRef };
                pipesListRef.current = [...pipesListRef.current, newPipe];
                setPipesList([...pipesListRef.current]);
                pipeSpwan = 0;
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
        <View style={globalStyles.container}>
            {pipesList.map((pipe) => (
                <Pipes key={pipe.id} ref={pipe.ref} />
            ))}
            <Dashboard
                onRestart={restartGameLoop}
                onStop={stopGameLoop}
                onJump={() => birdRef.current?.jump()}
            />

            <Bird ref={birdRef} />
        </View>
    );
}
