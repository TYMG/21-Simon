/**
 * This is the GameModule. Its contains the classes and
 * enums and needed for the game to run
 *
 */
"use strict";
(function (Color) {
    Color[Color["GREEN"] = 0] = "GREEN";
    Color[Color["RED"] = 1] = "RED";
    Color[Color["YELLOW"] = 2] = "YELLOW";
    Color[Color["BLUE"] = 3] = "BLUE";
})(exports.Color || (exports.Color = {}));
var Color = exports.Color;
;
(function (GameStatus) {
    GameStatus[GameStatus["NON_RUNNING"] = 0] = "NON_RUNNING";
    GameStatus[GameStatus["RUNNING"] = 1] = "RUNNING";
    GameStatus[GameStatus["GENERATING_PATTERN"] = 2] = "GENERATING_PATTERN";
    GameStatus[GameStatus["DISPLAYING_PATTERN"] = 3] = "DISPLAYING_PATTERN";
    GameStatus[GameStatus["LISTENING"] = 4] = "LISTENING";
    GameStatus[GameStatus["VALIDATING"] = 5] = "VALIDATING";
    GameStatus[GameStatus["FAILED"] = 6] = "FAILED";
})(exports.GameStatus || (exports.GameStatus = {}));
var GameStatus = exports.GameStatus;
;
(function (Difficulty) {
    Difficulty[Difficulty["EASY"] = 0] = "EASY";
    Difficulty[Difficulty["MEDIUM"] = 1] = "MEDIUM";
    Difficulty[Difficulty["HARD"] = 2] = "HARD";
    Difficulty[Difficulty["MASTER"] = 3] = "MASTER";
})(exports.Difficulty || (exports.Difficulty = {}));
var Difficulty = exports.Difficulty;
//# sourceMappingURL=game-module.js.map