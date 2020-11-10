class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :room_code
      t.boolean :done

      t.timestamps
    end
  end
end
