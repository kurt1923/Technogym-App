class Employee < ApplicationRecord
    has_many :projects
    has_many :admins, through: :projects
end
