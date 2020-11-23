class AddCurrentWordToGame < ActiveRecord::Migration[6.0]
  def change
    change_table :games do |t|
      t.string :currentWord

    end
  end
end
