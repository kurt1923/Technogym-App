class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authorize
    @current_admin = Admin.find_by(id: session[:admin_id])
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_admin
  end

  def current_admin
    @current_admin
  end

  def logged_in?
    !!current_admin
  end



end
