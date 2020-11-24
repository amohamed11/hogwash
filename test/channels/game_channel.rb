require 'test_helper'

class GameChannelTest < ActionCable::Channel::TestCase
    test "subscribes and create a game, try to start & fail" do
        subscribe
        perform :onCreateGame, player_name: "TestCreator", word_count: 5

        game = Game.last
        gameJson = game.as_json(include: [:words, :players])

        creator = game.players.first
        creatorJson = creator.as_json

        assert subscription.confirmed?
        assert_equal game.room_code.length, 5
        assert_equal game.words.count, 5
        assert_equal creator.isCreator, true
        assert_broadcast_on(game, { game: gameJson, player: creator, type: Constants::ActionTypes::GAME_CREATED })

        perform :onGameStart
        game.reload
        gameJson = game.as_json
        assert_broadcast_on(game, { game: gameJson, error: Constants::ErrorMessages::LOBBY_TOO_SMALL, type: Constants::ActionTypes::GAME_STARTED })
        assert_equal game.started, false
        assert_equal game.current_word, -1
    end

    test "subscribes and join a game, creator starts game" do
        subscribe
        perform :onCreateGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :onJoinGame, player_name: "TestPlayer", room_code: game.room_code

        player = game.players.find_by(name: "TestPlayer")
        gameJson = game.as_json(include: [:words, :players])
        playerJson = player.as_json

        assert subscription.confirmed?
        assert_equal player.name, "TestPlayer"
        assert_broadcast_on(game, { game: gameJson, player: playerJson, error: nil, type: Constants::ActionTypes::GAME_JOINED })

        perform :onGameStart
        game.reload
        gameJson = game.as_json
        assert_broadcast_on(game, { game: gameJson, error: nil, type: Constants::ActionTypes::GAME_STARTED })
        assert_equal game.started, true
        assert_equal game.current_word, 0
     end

    test "player answers incorrectly getting score of 0" do
        subscribe
        perform :onCreateGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :onJoinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")

        perform :onGameStart
        perform :onAnswer, player_id: player.id, answer: "totoro"
        player.reload

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_equal player.score, 0
    end

    test "player answers correctly getting score of 3" do
        subscribe
        perform :onCreateGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :onJoinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")

        perform :onGameStart
        game.reload
        word = game.words[game.current_word]

        perform :onAnswer, player_id: player.id, answer: word.definition
        player.reload

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_equal player.score, 3
    end

    test "player votes incorrectly, voted for player gets score + 1" do
        subscribe
        perform :onCreateGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :onJoinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")
        voted_for = game.players.where.not(name: "TestPlayer").first

        perform :onGameStart
        perform :onVote, player_id: player.id, definition: "Totoro", voted_for_id: voted_for.id
        player.reload
        voted_for.reload

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_equal player.score, 0
        assert_equal voted_for.score, 1
    end

    test "player votes correctly, gets score + 2" do
        subscribe
        perform :onCreateGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :onJoinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")
        voted_for = game.players.where.not(name: "TestPlayer").first

        perform :onGameStart
        game.reload
        word = game.words[game.current_word]

        perform :onVote, player_id: player.id, definition: word.definition, voted_for_id: voted_for.id
        player.reload
        voted_for.reload

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_equal player.score, 2
        assert_equal voted_for.score, 0
    end

    test "players vote, then next word is chosen" do
        subscribe
        perform :onCreateGame, player_name: "TestCreator", word_count: 5
        game = Game.last

        perform :onJoinGame, player_name: "TestPlayer", room_code: game.room_code
        player = game.players.find_by(name: "TestPlayer")
        voted_for = game.players.where.not(name: "TestPlayer").first

        perform :onGameStart
        game.reload
        word = game.words[game.current_word]

        perform :onVote, player_id: player.id, definition: word.definition, voted_for_id: voted_for.id
        player.reload
        voted_for.reload

        perform :onNextWord

        assert subscription.confirmed?
        assert_has_stream_for game
        assert_equal player.score, 2
        assert_equal voted_for.score, 0
    end

end
