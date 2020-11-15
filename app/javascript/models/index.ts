export interface Player {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    score: number;
}

export interface Word {
    id: number;
    created_at: Date;
    updated_at: Date;
    word: string;
    definition: string;
}

export interface Game {
    id: number;
    created_at: Date;
    updated_at: Date;
    room_code: string;
    words: Word[];
    players: Player[];
}

export interface GameState {
    game: Game;
    player: Player;
    session: string;
}
