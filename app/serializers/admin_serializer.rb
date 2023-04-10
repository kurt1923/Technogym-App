class AdminSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :lastname, :email, :title, :phone, :address, :img, :created_at, :updated_at, :employees
end
