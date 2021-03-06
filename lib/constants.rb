module Constants
  class ActionTypes
    GAME_CREATED = "GAME_CREATED"
    GAME_STARTED = "GAME_STARTED"
    GAME_JOINED = "GAME_JOINED"
    GAME_PLAYER_ANSWERED = "GAME_PLAYER_ANSWERED"
    GAME_CORRECT_SUBMISSION = "GAME_CORRECT_SUBMISSION"
    GAME_PLAYER_VOTED = "GAME_PLAYER_VOTED"
    GAME_NEXT_WORD = "GAME_NEXT_WORD"
    GAME_ENDED = "GAME_ENDED"
    GAME_LOBBY_CLOSED = "GAME_LOBBY_CLOSED"
  end

  class ErrorMessages
    LOBBY_FULL = "Lobby is full."
    LOBBY_TOO_SMALL = "Minimum on 2 players are required to start."
    GAME_NOT_FOUND = "Game was not found. Please try a different code."
  end
end
