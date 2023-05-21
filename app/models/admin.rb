class Admin < ApplicationRecord
    has_many :projects
    has_many :employees, -> { distinct }, through: :projects
    has_secure_password
    validates :email, uniqueness: true
    validates :email, presence: true
    validates :password, presence: true
    validates :firstname, presence: true
    validates :lastname, presence: true
    validates :phone, presence: true
    validates :title, presence: true
    validates :address, presence: true
    validates :img, presence: true
    

    # def self.uniqueEmployeesList(admin_id)
    #     Admin.find(admin_id).employees.order(id: :asc).uniq
    # end
        

end
