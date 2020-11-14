class GameChannel < ApplicationCable::Channel
  def subscribed
    @gameHandler = GameServices::GameHandler.new
  end
  def joinGame(data)
    game = @gameHandler.join(data["player_name"], data["room_code"])
    stream_for game
    broadcast_to game, words: game.words.as_json
  end

  def createGame(data)
    game = @gameHandler.create(data["creator_name"], data["word_count"])
    stream_for game
    broadcast_to game, words: game.words.as_json
  end

  def onAnswer(data)
    score = @gameHandler.handleAnswer(
      data["player_id"],
      data["word"],
      data["answer"]
    )
  end

  def onVote(data)
    score = @gameHandler.handleVote(
      data["player_id"],
      data["word"],
      data["answer"],
      data["voted_for_id"]
    )
  end

  def onGameEnd(data)
    winner = @gameHandler.selectWinner(data["room_code"])
    @gameHandler.deleteGame(data["room_code"])
  end
  
end
