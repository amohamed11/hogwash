class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :player_name
      t.belongs_to :game

      t.timestamps
    end
  end
end
