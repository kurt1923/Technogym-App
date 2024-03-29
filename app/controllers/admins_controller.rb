class AdminsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
# before_action :authorize, only: [:show, :update]
    
    def index
        admins = Admin.all
        render json: admins, include: :projects
    end

    def show
        admin = Admin.find(session[:user_id])
        if admin
            render json: admin, include: :projects
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end
    def show
        render json: current_admin
    end

    def create
        admin = Admin.create!(admin_params)
        session[:user_id] = admin.id
        render json: admin, status: :created
    end

    def update
        admin = find_admin
        admin.update!(admin_params)
        render json: admin
    end

    # def unique_employees_list
    #     admin = find_admin
    #     unique_employees = Admin.uniqueEmployeesList(admin.id)
    #     render json: unique_employees 
    # end


    private 
    def find_admin
        Admin.find(params[:id])
    end

    def admin_params
        params.permit(:firstname, :lastname, :email, :password, :phone, :title, :address, :img, :admin)
    end

    def render_not_found_response
        render json: { error: "admin not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end
