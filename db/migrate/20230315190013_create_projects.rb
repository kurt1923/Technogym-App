class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :description
      t.boolean :completed
      t.integer :admin_id
      t.integer :employee_id

      t.timestamps
    end
  end
end
