class CreateAdmins < ActiveRecord::Migration[6.1]
  def change
    create_table :admins do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :password_digest
      t.string :title
      t.string :phone
      t.string :address
      t.boolean :admin
      t.string :img

      t.timestamps
    end
  end
end
