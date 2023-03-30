class ApplicationController < ActionController::API
  include ActionController::Cookies

  def current_admin
    Admin.find_by(id: session[:admin_id])
  end

  def logged_in?
    !!current_admin
  end

  def authorized
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end

  def login(admin)
    session[:admin_id] = admin.id
  end

  def logout
    session.delete :admin_id
  end


end
