require 'test_helper'
 
class GameChannelTest < ActionCable::Channel::TestCase
    test "subscribes and create a game" do
        subscribe 
        perform :createGame, creator_name: "TestCreator", word_count: 5

        game = Game.last
        gameJson = game.as_json(include: [:words, :players])

        assert subscription.confirmed?
        assert_equal game.room_code.length, 5
        assert_equal game.words.count, 5
        assert_broadcast_on(game, game: gameJson)
    end

    test "subscribes and join a game" do
        subscribe 
        perform :joinGame, player_name: "TestPlayer", room_code: "12345"

        game = Game.find_by(room_code: "12345")
        gameJson = game.as_json(include: [:words, :players])
        player = Player.last

        assert subscription.confirmed?
        assert_equal player.name, "TestPlayer"
        assert_equal player.game_id, game.id
        assert_broadcast_on(game, game: gameJson)
     end

    test "player answers incorrectly getting score of 0" do
        subscribe
        perform :createGame, creator_name: "TestCreator", word_count: 5
        game = Game.last

        perform :joinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")

        word = game.words.first

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_broadcast_on(game, score: 0) do
          perform :onAnswer, player_id: player.id, word: word.word, answer: "totoro"
        end
    end

    test "player answers correctly getting score of 3" do
        subscribe
        perform :createGame, creator_name: "TestCreator", word_count: 5
        game = Game.last

        perform :joinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")

        word = game.words.first

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_broadcast_on(game, score: 3) do
          perform :onAnswer, player_id: player.id, word: word.word, answer: word.definition
        end
    end

    test "player votes incorrectly, voted for player gets score + 1" do
        subscribe
        perform :createGame, creator_name: "TestCreator", word_count: 5
        game = Game.last

        perform :joinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")
        voted_for = game.players.where.not(name: "TestPlayer").first

        word = game.words.first

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_broadcast_on(game, scores: {player.id=> 0, voted_for.id=> 1}) do
          perform :onVote, player_id: player.id, word: word.word, answer: "totoro", voted_for_id: voted_for.id
        end
    end

    test "player votes correctly, gets score + 2" do
        subscribe
        perform :createGame, creator_name: "TestCreator", word_count: 5
        game = Game.last

        perform :joinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")
        voted_for = game.players.where.not(name: "TestPlayer").first

        word = game.words.first

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_broadcast_on(game, scores: {player.id=> 2, voted_for.id=> 0}) do
          perform :onVote, player_id: player.id, word: word.word, answer: word.definition, voted_for_id: voted_for.id
        end
    end

end
