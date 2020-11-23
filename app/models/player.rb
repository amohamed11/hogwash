class Player < ApplicationRecord
    attribute :isCreator, :boolean, default: false
    attribute :score, :integer, default: 0
    belongs_to :game, class_name: "Game"

    validates :name, presence: true, length: { maximum: 20 }
end
