import { Game, Status } from "../models/game";
import { Guess } from "../models/guess";
import { Answer } from "../models/answer";

export const GAMES: Game[] = [
    {
        id: 1,
        answer: <Answer>{ id: 1, word: "ADEPT" },
        acceptedGuesses: <Guess[]>[
            { guessNum: 1, word: "OCEAN" },
            { guessNum: 2, word: "LABOR" },
            { guessNum: 3, word: "ADEPT" },
        ],
        status: Status.Won,
    },
    {
        id: 2,
        answer: <Answer>{ id: 1, word: "VIRAL" },
        acceptedGuesses: <Guess[]>[
            { guessNum: 1, word: "OCEAN" },
            { guessNum: 2, word: "CIVIC" },
            { guessNum: 3, word: "OUGHT" },
            { guessNum: 4, word: "QUIET" },
            { guessNum: 5, word: "STOOL" },
            { guessNum: 6, word: "ADEPT" },
        ],
        status: Status.Lost,
    }
];
