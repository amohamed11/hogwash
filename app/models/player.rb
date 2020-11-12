class Player < ApplicationRecord
    belongs_to :game, class_name: "Game"

    validates :name, presence: true, length: { maximum: 20 }
end
