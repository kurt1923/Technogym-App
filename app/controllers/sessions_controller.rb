class SessionsController < ApplicationController

def create
    admin = Admin.find_by(email: params[:email])
    if admin&.authenticate(params[:password])
        session[:user_id] = admin.id
        render json: admin
    else
        render json: { errors: ["Invalid email or password"] }, status: :unauthorized
    end
end

    def destroy
        session.delete :user_id
        head :no_content
    end

end
