require 'test_helper'
 
class GameChannelTest < ActionCable::Channel::TestCase
    test "subscribes and create a game" do
        # Simulate a subscription creation by calling `subscribe`
        subscribe 
        perform :createGame, word_count: 5

        # You can access the Channel object via `subscription` in tests
        game = Game.last
        assert subscription.confirmed?
        assert_equal game.room_code.length, 5
        assert_equal game.words.length, 5
        assert_broadcast_on(GameChannel.broadcasting_for(game), {title: "gameJoined", "words": game.words.as_json})
    end
    
    # test "subscribes and join a game" do
    #     game = Game.create(room_code: "12345")
    #     subscribe 
    #     perform :joinGame, data: {name: "Test", room_code: "12345"}
    
    #     assert subscription.confirmed?
    #     assert_has_stream game
    #     assert_broadcast_on(ChatChannel.broadcasting_for(game), title: "gameJoined")
    # end
end