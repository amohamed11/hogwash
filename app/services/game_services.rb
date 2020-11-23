require 'securerandom'
module GameServices
  class GameHandler
    def initialize()
    end

    def join(name, room_code)
      @game = Game.find_by(room_code: room_code)
      error = nil

      if @game.nil?
        error = Constants::ErrorMessages::GAME_NOT_FOUND
        return nil, nil, error
      end

      if @game.players.count == 6
        error = Constants::ErrorMessages::LOBBY_FULL
        return nil, nil, error
      end

      player = Player.create(name: name, game: @game)
      @game.players.reload

      return @game, player, error
    end

    def create(name, word_count)
      room_code = SecureRandom.alphanumeric(5).upcase

      word_count = word_count.to_i
      words = Word.find(Word.pluck(:id).sample(word_count))

      @game = Game.new(
        room_code: room_code,
        done: false,
        words: words
      )

      unless @game.valid?
        puts @game.errors.messages
        return @game.errors.messages
      end

      @game.save

      player = Player.create(name: name, isCreator: true, game: @game)
      @game.players.reload

      return @game, player
    end

    def start()
      error = nil

      if @game.players.count < 2
        error = Constants::ErrorMessages::LOBBY_TOO_SMALL
      else
        firstWord = @game.words[0]
        @game.update(started: true)
        @game.update(currentWord: firstWord)
      end

      GameChannel.broadcast_to @game, { started: @game.started, error: error, type: Constants::ActionTypes::GAME_STARTED }
    end

    def handleAnswer(player_id, answer)
      player = @game.players.find(player_id)
      word = @game.words.find_by(word: @game.currentWord)
      score = 0

      if answer == word.definition
        score += 3
      end

      player.score += score
      player.save
    end

    def handleVote(player_id, voted_for_definition, voted_for_id)
      player = @game.players.find(player_id)
      voted_for_player = @game.players.find(voted_for_id)
      word = @game.words.find_by(word: @game.currentWord)

      if voted_for_definition == word.definition
        player.score += 2
      else
        voted_for_player.score += 1
      end

      player.save
      voted_for_player.save
    end

    def nextWord()
      currentWord = @game.words.find_by(word: @game.currentWord)
      index = @game.words.index(currentWord)
      if index >= @game.word.count
        endGame()
      else
        endRound()
      end
    end

    def endRound()
      GameChannel.broadcast_to @game, { game: @game, type: Constants::ActionTypes::GAME_ROUND_ENDED }
    end

    def endGame()
      players = @game.players
      winner = players.order('score DESC').first

      @game.update(winner: winner)

      GameChannel.broadcast_to @game, { game: @game, type: Constants::ActionTypes::GAME_ENDED }
    end

    def closeGameRoom()
      GameChannel.broadcast_to @game, { type: Constants::ActionTypes::GAME_CLOSED }

      Game.destroy(@game)
    end
  end
end
