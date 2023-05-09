class Admin < ApplicationRecord
    has_many :projects
    has_many :employees, through: :projects
    has_secure_password
    validates :email, uniqueness: true

    def self.uniqueEmployeesList(admin_id)
        Admin.find(admin_id).employees.order(id: :asc).uniq
    end
        

end
