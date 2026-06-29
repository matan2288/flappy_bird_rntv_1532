import { View, Text } from "react-native";
import { globalStyles } from "@/theme/globalStyles";
import Bird from "@/components/game/Bird/Bird";
import Pipes from "@/components/game/Pipes/Pipes";
import { useRef, useEffect, useState, createRef } from "react";
import { ActionBar } from "./components/ActionBar";
import type { GameScreenProps, BirdRef, PipesRef } from "./GameScreen.types";
import {
    PIPE_SPAWN_TIMER_LIMIT,
    PIPE_SPAWN_INITIAL,
    PIPE_X_INITIAL_MOVEMENT_SPEED,
    PIPE_OFFSCREEN_REMOVAL,
    DifficultySpeed,
} from "./consts";
import { BIRD_WIDTH, BIRD_INITIAL_X } from "@/components/game/Bird/consts";
import { PIPE_WIDTH } from "@/components/game/Pipes/consts";
import { getDifficultyByScore } from "./utils";
import { useUserStore } from "@/store";

export default function GameScreen({ navigation }: GameScreenProps) {
    const username = useUserStore((state) => state.username);
    const registerScore = useUserStore((state) => state.registerScore);
    const registerDifficulty = useUserStore((state) => state.registerDifficulty);

    const birdRef = useRef<BirdRef>(null);
    const difficultyRef = useRef<number>(PIPE_X_INITIAL_MOVEMENT_SPEED);
    const scoreRef = useRef<number>(0);
    const gameLoop = useRef<ReturnType<typeof setInterval> | null>(null);
    const pipesListRef = useRef<{ id: string; ref: React.RefObject<PipesRef | null> }[]>([]);
    const pipeSpawnRef = useRef(PIPE_SPAWN_INITIAL);
    const nextPipeIdRef = useRef(0);
    const scoredPipeIdsRef = useRef<Set<string>>(new Set());

    const [pipesList, setPipesList] = useState<{ id: string; ref: React.RefObject<PipesRef | null> }[]>([]);
    const [displayScore, setDisplayScore] = useState(0);
    const [displayDifficulty, setDisplayDifficulty] = useState(PIPE_X_INITIAL_MOVEMENT_SPEED);

    const startGameLoop = () => {
        if (gameLoop.current) return;

        gameLoop.current = setInterval(() => {
            birdRef.current?.applyGravity();

            pipesListRef.current.forEach((pipe) => {
                pipe.ref.current?.movePipes(difficultyRef.current);
            });

            pipeSpawnRef.current++;

            const pipes = pipesListRef.current;
            if (pipes.length > 0) {
                const firstPipe = pipes[0];
                const firstPipeState = firstPipe.ref.current?.getState();
                const firstPipeX = firstPipeState?.pipesXposition;
                const isHorizontallyAligned =
                    typeof firstPipeX === "number" &&
                    BIRD_INITIAL_X + BIRD_WIDTH > firstPipeX &&
                    BIRD_INITIAL_X < firstPipeX + PIPE_WIDTH;

                if (firstPipeState && isHorizontallyAligned) {
                    if (birdRef.current?.isBirdDead(firstPipeState)) {
                        stopGameLoop();
                        registerScore(scoreRef.current);
                        navigation.navigate("YourScore", {
                            score: scoreRef.current,
                            name: username || "Player",
                        });
                        return;
                    }

                    if (!scoredPipeIdsRef.current.has(firstPipe.id)) {
                        scoredPipeIdsRef.current.add(firstPipe.id);
                        scoreRef.current += 7;
                        setDisplayScore(scoreRef.current);
                    }
                }

                if (firstPipeX !== undefined && firstPipeX < PIPE_OFFSCREEN_REMOVAL) {
                    scoredPipeIdsRef.current.delete(firstPipe.id);
                    pipesListRef.current = pipes.slice(1);
                    setPipesList([...pipesListRef.current]);
                }
            }

            if (pipeSpawnRef.current === PIPE_SPAWN_TIMER_LIMIT) {
                const newPipe = {
                    id: String(++nextPipeIdRef.current),
                    ref: createRef<PipesRef>(),
                };
                pipesListRef.current = [...pipesListRef.current, newPipe];
                setPipesList([...pipesListRef.current]);
                pipeSpawnRef.current = PIPE_SPAWN_INITIAL;
            }

            const newDifficulty = getDifficultyByScore(scoreRef.current);
            if (newDifficulty !== difficultyRef.current) {
                difficultyRef.current = newDifficulty;
                setDisplayDifficulty(newDifficulty);
                registerDifficulty(newDifficulty);
            }
        }, 16);
    };

    const restartGameLoop = () => {
        stopGameLoop();
        birdRef.current?.resetBirdGravity();
        pipesListRef.current = [];
        setPipesList([]);
        scoreRef.current = 0;
        setDisplayScore(0);
        registerScore(0);
        difficultyRef.current = PIPE_X_INITIAL_MOVEMENT_SPEED;
        setDisplayDifficulty(PIPE_X_INITIAL_MOVEMENT_SPEED);
        registerDifficulty(DifficultySpeed.LEVEL_1);
        pipeSpawnRef.current = PIPE_SPAWN_INITIAL;
        scoredPipeIdsRef.current.clear();
        startGameLoop();
    };

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
        <View style={[globalStyles.container, { overflow: "hidden" }]}>
            {pipesList.map((pipe) => (
                <Pipes key={pipe.id} ref={pipe.ref} />
            ))}
            <ActionBar
                onRestart={restartGameLoop}
                onStop={stopGameLoop}
                onJump={() => birdRef.current?.jump()}
            />
            <Text style={{ marginBottom: 4, fontWeight: "bold", color: "white" }}>
                Name: {username} Score: {displayScore} Difficulty: {displayDifficulty}
            </Text>
            <Bird ref={birdRef} />
        </View>
    );
}
