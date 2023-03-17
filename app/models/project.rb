class Project < ApplicationRecord
    belongs_to :employee
    belongs_to :admin
end
