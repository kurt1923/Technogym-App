class Project < ApplicationRecord
    belongs_to :employee, optional: true
    belongs_to :admin, optional: true

    validates :name, presence: true
    validates :description, presence: true
    validates :category, presence: true

 
    
end
