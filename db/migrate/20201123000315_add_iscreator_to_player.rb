class AddIscreatorToPlayer < ActiveRecord::Migration[6.0]
  def change
    change_table :players do |t|
      t.boolean :isCreator

    end
  end
end
