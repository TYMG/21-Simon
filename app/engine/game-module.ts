/**
 * This is the GameModule. Its contains the classes and 
 * enums and needed for the game to run
 * 
 */

export enum Color {
        GREEN = 0,
        RED = 1,
        YELLOW = 2,
        BLUE = 3
    };

export enum GameStatus {
        NON_RUNNING= 0,
        RUNNING = 1,
        GENERATING_PATTERN = 2,
        DISPLAYING_PATTERN = 3,
        LISTENING = 4,
        VALIDATING = 5,
        FAILED = 6,
    };

export enum Difficulty {
        EASY,
        MEDIUM,
        HARD,
        MASTER,
}