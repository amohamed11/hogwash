export interface Player {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    score: number;
    isCreator: boolean;
}

export interface Game {
    id: number;
    created_at: string;
    updated_at: string;
    room_code: string;
    currentWord: string;
    players: Player[];
    done: boolean;
    started: boolean;
}
