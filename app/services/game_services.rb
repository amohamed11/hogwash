require 'securerandom'
module GameServices
  class GameHandler
    def initialize()
    end

    def join(name, room_code)
      @game = Game.find(room_code: room_code)
      if @game == nil
        return nil
      end
      player= Player.create(name, 0, @game)
      GameChannel.broadcast_to(@game, {"title": "gameJoined", "room_code": @game.room_code})
    end

    def create(data)
      room_code = SecureRandom.alphanumeric(5).upcase

      word_count = data[:word_count].to_i
      words = Word.find(Word.pluck(:id).sample(word_count))
      @game = Game.create(room_code: room_code, words: words)

      GameChannel.broadcast_to(@game, {"title": "gameCreated", "words": words.as_json})
    end

    def handleAnswer(player_id, word, answer)
      word = @game.words.find(word: word)
      player = @game.players.find(player_id)
      score = 0

      if answer == word.definition
        score += 3
      end

      player.score += score
      player.save

      GameChannel.broadcast_to(@game, {"title": "answered", "score": score})
    end

    def handleVote(player_id, word, answer, voted_for_id)
      word = @game.words.find(word: word)
      player = @game.players.find(name: player_id)
      voted_for_player = Player.find(voted_for_id)

      if answer == word.definition
        player.score += 2
      else
        voted_for_player.score += 1
      end

      player.save
      voted_for_player.save

      scorebox = {:player.name => player.score, :voted_for_player.name => voted_for_player.score}
      GameChannel.broadcast_to(@game, {"title": "voted", "score": scorebox})
    end

    def selectWinner(room_code)
      players = @game.players
      winner = players.order('score DESC').first

      @game.winner = winner
      @game.save

      GameChannel.broadcast_to(@game, {"title": "gameDone", "winner": winner})
    end

    def deleteGame(room_code)
      Game.destroy(@game)
    end
  end
end