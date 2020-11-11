class GameChannel < ApplicationCable::Channel
  def subscribed
    @gameHandler = GameServices::GameHandler.new
  end
  def joinGame(data)
    @game = @gameHandler.join(data[:name], data[:room_code])
    stream_for @game
  end

  def createGame(data)
    @game = @gameHandler.create(data)
    stream_for @game
  end

  def onAnswer(data)
    score = @gameHandler.handleAnswer(
      data[:player_id],
      data[:word],
      data[:answer]
    )
  end

  def onVote(data)
    score = @gameHandler.handleAnswer(
      data[:player_id],
      data[:word],
      data[:answer],
      data[:voted_for_id]
    )
  end

  def onGameEnd(data)
    winner = @gameHandler.selectWinner(data[:room_code])
    @gameHandler.deleteGame(data[:room_code])
  end
  
end
