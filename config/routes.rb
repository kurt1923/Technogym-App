Rails.application.routes.draw do
  resources :admins do
    resources :employees
  end
  resources :employees do
    resources :projects 
  end

  resources :projects do
    resources :admins
  end

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'admins#show'
  get '/projectsbyemployee/:firstname', to: 'projects#projectsbyemployee'
  # get '/projectDescription/:description', to: 'projects#projectDescription'
  # get '/projects/completed/:completed', to: 'projects#completed'
  # get 'admins/:id/unique_employees_list', to: 'admins#unique_employees_list'
  # get '/getphone/:phone', to: 'employees#getphone'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

