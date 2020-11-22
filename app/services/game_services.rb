require 'securerandom'
module GameServices
  class GameHandler
    def initialize()
    end

    def join(name, room_code)
      @game = Game.find_by(room_code: room_code)
      if @game.nil?
        return nil
      end

      Player.create(name: name, score: 0, game: @game)

      return @game
    end

    def create(creator_name, word_count)
      room_code = SecureRandom.alphanumeric(5).upcase

      word_count = word_count.to_i
      words = Word.find(Word.pluck(:id).sample(word_count))

      creator = Player.create(name: creator_name, score: 0)

      @game = Game.new(
        room_code: room_code, 
        done: false, 
        words: words, 
        creator: creator
      )

      unless @game.valid?
        puts @game.errors.messages
        return nil
      end

      @game.save

      creator.game = @game
      creator.save

      return @game
    end

    def handleAnswer(player_id, word, answer)
      player = @game.players.find(player_id)
      word = @game.words.find_by(word: word)
      score = 0

      if answer == word.definition
        score += 3
      end

      player.score += score
      player.save

      GameChannel.broadcast_to @game, { score: score, type: "GAME_PLAYER_ANSWER" }
    end

    def handleVote(player_id, word, answer, voted_for_id)
      player = @game.players.find(player_id)
      voted_for_player = @game.players.find(voted_for_id)
      word = @game.words.find_by(word: word)

      if answer == word.definition
        player.score += 2
      else
        voted_for_player.score += 1
      end

      player.save
      voted_for_player.save

      scores = {player.id => player.score, voted_for_player.id => voted_for_player.score}

      GameChannel.broadcast_to @game, { scores: scores, type: "GAME_PLAYER_VOTE" }
    end

    def endGame()
      players = @game.players
      winner = players.order('score DESC').first

      @game.winner = winner
      @game.save

      GameChannel.broadcast_to @game, { winner: winner, type: "GAME_ENDED" }
    end

    def closeGameRoom()
      GameChannel.broadcast_to @game, { type: "GAME_CLOSED" }

      Game.destroy(@game)
    end
  end
end
