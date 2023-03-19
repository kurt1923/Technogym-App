class Project < ApplicationRecord
    belongs_to :employee, optional: true
    belongs_to :admin, optional: true
end
