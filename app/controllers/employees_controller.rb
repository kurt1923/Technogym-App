class EmployeesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :invalid_project
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    

    def index
        employees = Employee.all
        render json: employees
    end

    def show
        employee = find_employee
        render json: employee
    end

    def create
        employee = Employee.create!(employee_params)
        render json: employee, status: :created
    end

    def update
        employee = find_employee
        employee.update!(employee_params)
        render json: employee
    end

    def destroy
        employee = find_employee
        employee.destroy
        head :no_content
    end

    
    private
    
    def employee_params
        params.permit(:firstname, :lastname, :email, :password, :phone, :title, :address, :img)
    end

    def find_employee
        Employee.find(params[:id])
    end

    def render_not_found_response
        render json: { error: "Camper not found" }, status: :not_found
    end
    
    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
    
    def authorize
        return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :admin_id
    end
end

