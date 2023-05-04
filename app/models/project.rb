class Project < ApplicationRecord
    belongs_to :employee, optional: true
    belongs_to :admin, optional: true

    validates :name, presence: true
    validates :description, presence: true
    validates :category, presence: true

    def self.findCompletedProjects(string)
        completed = string.downcase == "true"

        if completed 
            Project.where(completed: true).order(:created_at).limit(5)
        else
            Project.where(completed: false).order(:created_at).limit(5)
        end
    end

    
end
