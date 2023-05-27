class ApplicationController < ActionController::API
  include ActionController::Cookies

  def current_admin
    Admin.find_by(id: session[:user_id])
  end

  def authorize
    if !current_admin
      render json: { errors: ["Not authorized"] }, status: :unauthorized
    end  
  end
  

  def logged_in?
    !!current_admin
  end



end
