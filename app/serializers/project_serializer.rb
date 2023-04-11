class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :employee_id, :category, :created_at, :updated_at, :adminName, :admin_id, :completed, :employee_id, :employeeName 

  def adminName
    object.admin.firstname + " " + object.admin.lastname
  end 

  def employeeName
    object.employee.firstname + " " + object.employee.lastname
  end
end
