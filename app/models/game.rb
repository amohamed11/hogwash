class Game < ApplicationRecord
    attribute :started, :boolean, default: false
    attribute :done, :boolean, default: false

    has_many :players, class_name: "Player"
    has_many :game_words, class_name: "GameWord"
    has_many :words, class_name: "Word", through: :game_words
    has_one :winner, class_name: "Player"
    belongs_to :current_word, class_name: "Word", foreign_key: "id"

    validates :room_code, presence: true, uniqueness: true
    validates :words, presence: true
    validates_length_of :players, maximum: 6
end
