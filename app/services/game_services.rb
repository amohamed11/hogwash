require 'securerandom'
require 'levenshtein'

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

      wordCount = word_count.to_i
      words = Word.find(Word.pluck(:id).sample(wordCount))

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
      @game.reload
      error = nil

      if @game.done
        wordCount = @game.words.count
        words = Word.find(Word.pluck(:id).sample(wordCount))
        @game.players.each do |player|
          player.score = 0
          player.save
        end
        @game.players.reload
        @game.update(done: false)
        @game.update(words: words)
      end

      if @game.players.count < 2
        error = Constants::ErrorMessages::LOBBY_TOO_SMALL
      else
        @game.update(started: true)
        @game.update(current_word: 0)
      end

      @game.reload
      gameJson = @game.as_json(include: [:words, :players])
      GameChannel.broadcast_to @game, { game: gameJson, error: error, type: Constants::ActionTypes::GAME_STARTED }
    end

    def handleAnswer(player_id, answer)
      @game.reload
      player = @game.players.find(player_id)
      word = @game.words[@game.current_word]
      score = 0

      # If the answer is correct, no need to add the answer twice to possible vote options
      threshold = ((answer.length + word.definition.length) / 3).to_f.ceil
      puts "Current word: ", @game.current_word
      if Levenshtein.distance(word.definition, answer) <= threshold
        score += 3
        player.increment! :score, score
        @game.players.reload
        GameChannel.broadcast_to @game, { answer: {definition: answer, answerer_id: player_id}, type: Constants::ActionTypes::GAME_CORRECT_SUBMISSION }
      else
        GameChannel.broadcast_to @game, { answer: {definition: answer, answerer_id: player_id}, type: Constants::ActionTypes::GAME_PLAYER_ANSWERED }
      end
    end

    def handleVote(player_id, voted_for_definition, voted_for_id)
      @game.reload
      player = @game.players.find(player_id)
      word = @game.words[@game.current_word]

      if voted_for_id == -1 || voted_for_definition == word.definition
        player.increment! :score, 2
      else
        voted_for_player = @game.players.find(voted_for_id)
        voted_for_player.increment! :score, 1
      end

      @game.players.reload
      GameChannel.broadcast_to @game, { vote: {definition: voted_for_definition, answerer_id: voted_for_id, voter_id: player_id}, type: Constants::ActionTypes::GAME_PLAYER_VOTED }
    end

    def nextWord()
      @game.reload
      index = @game.current_word + 1

      if index >= @game.words.count
        endGame()
      else
        @game.increment! :current_word
        gameJson = @game.as_json(include: :players)
        GameChannel.broadcast_to @game, { game: gameJson, type: Constants::ActionTypes::GAME_NEXT_WORD }
      end
    end

    def endGame()
      @game.reload

      @game.update(done: true, started: false)

      gameJson = @game.as_json(include: [:words, :players])

      GameChannel.broadcast_to @game, { game: gameJson, type: Constants::ActionTypes::GAME_ENDED }
    end

    def closeGameRoom()
      GameChannel.broadcast_to @game, { type: Constants::ActionTypes::GAME_CLOSED }

      Game.destroy(@game)
    end
  end
end
