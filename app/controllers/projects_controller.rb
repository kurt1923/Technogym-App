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

    # def create
    #     project = Project.create!(project_params)
    #     render json: project, status: :created
    # end

    def create
    
        admin = Admin.find_by(id: session[:user_id])
        project = admin.projects.create!(project_params)
        render json: project, status: :created
    end

    def update
        project = find_project
        project.update!(project_params)
        render json: project
    end

    def destroy
        user = User.find(session[:user_id])
        project = user.projects.find(params[:id])
        project.destroy
        render json: application
    end
    
    
    private
    
    def project_params
        params.permit(:name, :description, :completed, :admin_id, :employee_id, :category)
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
        return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :admin_id
    end
end



