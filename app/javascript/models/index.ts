export interface Player {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    score: number;
}

export interface Word {
    id: number;
    created_at: string;
    updated_at: string;
    word: string;
    definition: string;
}

export interface Game {
    id: number;
    created_at: string;
    updated_at: string;
    room_code: string;
    words: Word[];
    players: Player[];
    done: boolean;
}

export interface Connection {
    state: string;
    session: string;
}


export interface GameState {
    game: Game;
    player: Player;
    connection: Connection;
}
