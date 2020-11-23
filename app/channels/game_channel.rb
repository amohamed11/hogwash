class GameChannel < ApplicationCable::Channel
  def subscribed
    @gameHandler = GameServices::GameHandler.new
  end
  def joinGame(data)
    game, player = @gameHandler.join(data["player_name"], data["room_code"])

    gameJson = game.as_json(include: [:words, :players])
    playerJson = player.as_json

    stream_for game
    broadcast_to game, { game: gameJson, player: playerJson, type: ActionTypes::GAME_JOINED }
  end

  def createGame(data)
    game, player = @gameHandler.create(data["player_name"], data["word_count"])

    gameJson = game.as_json(include: [:words, :players])
    playerJson = player.as_json

    stream_for game
    broadcast_to game, { game: gameJson, player: playerJson, type: ActionTypes::GAME_CREATED }
  end

  def onAnswer(data)
    @gameHandler.handleAnswer(
      data["player_id"],
      data["word"],
      data["answer"]
    )
  end

  def onVote(data)
    @gameHandler.handleVote(
      data["player_id"],
      data["word"],
      data["answer"],
      data["voted_for_id"]
    )
  end

  def onGameEnd(data)
    @gameHandler.endGame()
  end

  def onGameRoomClose(data)
    @gameHandler.closeGameRoom()
  end
  
end
