require 'securerandom'
module GameServices
  class GameHandler
    def initialize()
    end

    def join(name, room_code)
      @game = Game.where(room_code: room_code).first
      if @game == nil
        return nil
      end
      player= Player.create(name: name, score: 0, game: @game)

      GameChannel.broadcast_to(@game, {title: "gameJoined", room_code: room_code})
    end

    def create(name, word_count)
      room_code = SecureRandom.alphanumeric(5).upcase

      word_count = word_count.to_i
      words = Word.find(Word.pluck(:id).sample(word_count))

      creator = Player.create(name: name, score: 0)

      @game = Game.new(
        room_code: room_code, 
        done: false, 
        words: words, 
        creator: creator
      )

      if !@game.valid?
        puts @game.errors.messages
      end

      @game.save

      creator.game = @game
      creator.save

      GameChannel.broadcast_to(@game, {title: "gameCreated", "words": words.as_json})
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

      GameChannel.broadcast_to(@game, {title: "answered", "score": score})
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
      GameChannel.broadcast_to(@game, {title: "voted", "score": scorebox})
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
