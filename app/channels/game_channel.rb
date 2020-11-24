class GameChannel < ApplicationCable::Channel
  def subscribed
    @gameHandler = GameServices::GameHandler.new
  end
  def onJoinGame(data)
    game, player, error = @gameHandler.join(data["player_name"], data["room_code"])

    if error.nil?
      gameJson = game.as_json(include: [:words, :players])
      playerJson = player.as_json
    end

    stream_for game
    broadcast_to game, { game: gameJson, player: playerJson, error: error, type: Constants::ActionTypes::GAME_JOINED }
  end

  def onCreateGame(data)
    game, player = @gameHandler.create(data["player_name"], data["word_count"])

    gameJson = game.as_json(include: [:words, :players])
    playerJson = player.as_json

    stream_for game
    broadcast_to game, { game: gameJson, player: playerJson, type: Constants::ActionTypes::GAME_CREATED }
  end

  def onGameStart()
    @gameHandler.start()
  end

  def onAnswer(data)
    @gameHandler.handleAnswer(
      data["player_id"],
      data["answer"]
    )
  end

  def onVote(data)
    @gameHandler.handleVote(
      data["player_id"],
      data["definition"],
      data["voted_for_id"]
    )
  end

  def onNextWord()
    @gameHandler.nextWord()
  end

  def onGameRoomClose(data)
    @gameHandler.closeGameRoom()
  end
end
