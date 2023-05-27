class ProjectsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :invalid_project
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize, only: [:create, :update, :destroy]

    def index
        projects = Project.all
        render json: projects, include: :admin, include: :employee
    end
    
    def show
        project = find_project
        render json: project, include: :admin, include: :employee
    end

    def create
        admin = find_admin
        project = admin.projects.create!(project_params)
        render json: project, status: :created
    end

    def update
        admin = find_admin
        project = admin.projects.find(params[:id])
        project.update!(project_params)
        render json: project
    end

    def destroy
        admin = find_admin
        project = admin.projects.find(params[:id])
        project.destroy
        render json: project
    end
    
    
    private
    
    def project_params
        params.permit(:name, :description, :completed, :employee_id, :category)
    end

    def find_admin
        Admin.find(session[:user_id])
    end
    
    def find_project
        Project.find(params[:id])
    end
    
    def render_not_found_response
        render json: { error: "Project not found" }, status: :not_found
    end
    
    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
    
    def authorize
        return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id
    end
end



