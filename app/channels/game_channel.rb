require ""

class GameChannel < ApplicationCable::Channel
  def joinGame(data)
    @game = GameServices::GameHandler.join(data[:room_code])
    stream_for @game
  end

  def createGame(data)
    @game = GameServices::GameHandler.create(data[:word_count])
    stream_for @game
    GameChannel.broadcast_to(@game, {"title": "gameCreated", "words": @game.words})
  end

  def onAnswer(data)
    score = GameServices::GameHandler.handleAnswer(
      data[:player_id],
      data[:word],
      data[:answer]
    )
    GameChannel.broadcast_to(@game, {"title": "answered", "score": score})
  end

  def onVote(data)
    score = GameServices::GameHandler.handleAnswer(
      data[:player_id],
      data[:word],
      data[:answer],
      data[:voted_for_id]
    )
    GameChannel.broadcast_to(@game, {"title": "voted", "score": score})
  end

  def onGameEnd(data)
    winner = GameServices::GameHandler.selectWinner(data[:room_code])
    GameChannel.broadcast_to(@game, {"title": "gameDone", "winner": winner})
    GameServices::GameHandler.deleteGame(data[:room_code])
  end
  
end
