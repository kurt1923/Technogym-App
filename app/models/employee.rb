class Employee < ApplicationRecord
    has_many :projects, dependent: :destroy
    has_many :admins, through: :projects

    validates :firstname, presence: true
    validates :lastname, presence: true
    validates :email, presence: true, uniqueness: true
    validates :title, presence: true
    validates :phone, presence: true
    validates :address, presence: true
    validates :img, presence: true
    validates :password, presence: true
    

end
