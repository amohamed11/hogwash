class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params[:room_code]}"
    # Game::Game.join(params[:code])
  end

  def addDefinition
    Game::Game.addDefinition(
      params[:room_code], 
      params[:definition]
    )
  end
  

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
