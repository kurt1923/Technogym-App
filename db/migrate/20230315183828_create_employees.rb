class CreateEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :password
      t.string :title
      t.string :phone
      t.string :address
      t.string :img

      t.timestamps
    end
  end
end
