class Game < ApplicationRecord
    has_many :players, class_name: "Player"
    has_many :words, class_name: "Word"
    has_one :winner, class_name: "Player"

end
