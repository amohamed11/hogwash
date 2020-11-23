module Constants
  class ActionTypes
    GAME_CREATED = "GAME_CREATED"
    GAME_STARTED = "GAME_STARTED"
    GAME_JOINED = "GAME_JOINED"
    GAME_PLAYER_ANSWERED = "GAME_PLAYER_ANSWERED"
    GAME_PLAYER_VOTED = "GAME_PLAYER_VOTED"
    GAME_ROUND_ENDED = "GAME_ROUND_ENDED"
    GAME_ENDED = "GAME_ENDED"
    GAME_ROOM_CLOSED = "GAME_ROOM_CLOSED"
  end

  class ErrorMessages
    LOBBY_FULL = "Lobby is full."
    LOBBY_TOO_SMALL = "Minimum on 2 players are required to start."
    GAME_NOT_FOUND = "Game was not found. Please try a different code."
  end
end
