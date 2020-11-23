class Game < ApplicationRecord
    has_many :players, class_name: "Player"
    has_many :game_words, class_name: "GameWord"
    has_many :words, class_name: "Word", through: :game_words
    has_one :winner, class_name: "Player"

    validates :room_code, presence: true, uniqueness: true
    validates :words, presence: true
end
