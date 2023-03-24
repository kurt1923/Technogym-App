class Admin < ApplicationRecord
    has_secure_password
    has_many :projects
    has_many :employees, through: :projects
    validates :name, presence: true
    validates :description, presence: true
    validates :admin_id, presence: true
    validates :employee_id, presence: true
end
