import { Guess } from "./guess";
import { Answer } from "./answer";

export interface Game {
    id: number;
    answer: Answer;
    acceptedGuesses: Guess[];
    status: Status;
}

export enum Status {
    Playing,
    Won,
    Lost
}
