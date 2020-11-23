require 'test_helper'
 
class GameChannelTest < ActionCable::Channel::TestCase
    test "subscribes and create a game" do
        subscribe 
        perform :createGame, player_name: "TestCreator", word_count: 5

        game = Game.last
        gameJson = game.as_json(include: [:words, :players])

        creator = game.players.first
        creatorJson = creator.as_json

        assert subscription.confirmed?
        assert_equal game.room_code.length, 5
        assert_equal game.words.count, 5
        assert_equal creator.isCreator, true
        assert_broadcast_on(game, { game: gameJson, player: creator, type: ActionTypes::GAME_CREATED })
    end

    test "subscribes and join a game" do
        subscribe 
        perform :joinGame, player_name: "TestPlayer", room_code: "12345"

        game = Game.find_by(room_code: "12345")
        gameJson = game.as_json(include: [:words, :players])

        player = game.players.last
        playerJson = player.as_json

        assert subscription.confirmed?
        assert_equal player.name, "TestPlayer"
        assert_broadcast_on(game, { game: gameJson, player: playerJson, error: nil, type: ActionTypes::GAME_JOINED })
     end

    test "player answers incorrectly getting score of 0" do
        subscribe
        perform :createGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :joinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")
        word = game.words.first

        perform :onAnswer, player_id: player.id, word: word.word, answer: "totoro"
        player.reload

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_equal player.score, 0
    end

    test "player answers correctly getting score of 3" do
        subscribe
        perform :createGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :joinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")
        word = game.words.first

        perform :onAnswer, player_id: player.id, word: word.word, answer: word.definition
        player.reload


        assert subscription.confirmed?
        assert_has_stream_for game
        assert_equal player.score, 3
    end

    test "player votes incorrectly, voted for player gets score + 1" do
        subscribe
        perform :createGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :joinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")
        voted_for = game.players.where.not(name: "TestPlayer").first
        word = game.words.first

        perform :onVote, player_id: player.id, word: word.word, answer: "totoro", voted_for_id: voted_for.id
        player.reload
        voted_for.reload

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_equal player.score, 0
        assert_equal voted_for.score, 1
    end

    test "player votes correctly, gets score + 2" do
        subscribe
        perform :createGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :joinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")
        voted_for = game.players.where.not(name: "TestPlayer").first
        word = game.words.first

        perform :onVote, player_id: player.id, word: word.word, answer: word.definition, voted_for_id: voted_for.id
        player.reload
        voted_for.reload

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_equal player.score, 2
        assert_equal voted_for.score, 0
    end

end
