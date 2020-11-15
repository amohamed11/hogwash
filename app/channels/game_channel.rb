class GameChannel < ApplicationCable::Channel
  def subscribed
    @gameHandler = GameServices::GameHandler.new
  end
  def joinGame(data)
    game = @gameHandler.join(data["player_name"], data["room_code"])
    gameJson = game.as_json(include: :words)
    stream_for game
    broadcast_to game, game: gameJson
  end

  def createGame(data)
    game = @gameHandler.create(data["creator_name"], data["word_count"])
    gameJson = game.as_json(include: [:words, :players])
    stream_for game
    broadcast_to game, game: gameJson
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
    @gameHandler.selectWinner()
    @gameHandler.deleteGame()
  end
  
end
