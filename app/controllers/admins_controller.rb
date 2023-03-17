class AdminsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    
    def index
        admins = Admin.all
        render json: admins, include: :projects
    end

    def show
        admin = find_admin
        render json: admin
    end

    def create
        admin = admin.create!(admin_params)
        render json: admin, status: :created
    end

    def update
        admin = find_admin
        admin.update!(admin_params)
        render json: admin
    end

    private 
    def find_admin
        Admin.find(params[:id])
    end

    def admin_params
        params.permit(:firstname, :lastname, :email, :password, :phone, :address, :img, :admin)
    end

    def render_not_found_response
        render json: { error: "admin not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end