class Player < ApplicationRecord
    belongs_to :game, class_name: "Game"
end
