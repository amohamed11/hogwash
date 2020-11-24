class AddCurrentWordToGame < ActiveRecord::Migration[6.0]
  def change
    change_table :games do |t|
      t.integer :current_word

    end
  end
end
