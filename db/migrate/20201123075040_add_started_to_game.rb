class AddStartedToGame < ActiveRecord::Migration[6.0]
  def change
    change_table :games do |t|
      t.boolean :started

    end
  end
end
