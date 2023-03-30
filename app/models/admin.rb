class Admin < ApplicationRecord
    has_many :projects
    has_many :employees, through: :projects
    has_secure_password
    validates :email, uniqueness: true
end
