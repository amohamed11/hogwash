module Game
  class Game
    def join(room_code)
      @game = Game.find(room_code)
      if game == nil
        create(room_code)
      end
    end

    def create
      @game = Game.new(params[:room_code])
      @game.save

      generateWords(params[:room_code], params[:word_count])
    end

    def addDefinition(room_code)

    end

    def generateWords(room_code, word_count)
      @game = Game.find(room_code)
      @words = Word.find(Word.pluck(:id).sample(word_count))
      for words.each |word| do
        game.words.a
      end
    end

end
