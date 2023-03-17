class Admin < ApplicationRecord
    has_many :projects
    has_many :employees, through: :projects
end
