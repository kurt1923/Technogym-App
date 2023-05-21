class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :lastname, :email, :title, :phone, :address, :img, :created_at, :updated_at,:completedProjects, :incompleteProjects, :projects, 
  
  def completedProjects
    object.projects.where(completed: true).count
  end

  def incompleteProjects
    object.projects.where(completed: false).count
  end
end
