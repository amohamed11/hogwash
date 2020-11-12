require 'test_helper'
 
class GameChannelTest < ActionCable::Channel::TestCase
    test "subscribes and create a game" do
        # Simulate a subscription creation by calling `subscribe`
        subscribe 
        perform "createGame", name: "TestCreator", word_count: 5

        # You can access the Channel object via `subscription` in tests
        game = Game.last
        assert subscription.confirmed?
        assert_equal game.room_code.length, 5
    end

    test "subscribes and join a game" do
        subscribe 
        perform :joinGame, params: {name: "TestPlayer", room_code: "12345"}

        game = Game.where(room_code: "12345").first
        player = Player.last

        assert subscription.confirmed?
        assert_equal player.name, "TestPlayer"
        assert_equal player.game_id, game.id
     end
end
