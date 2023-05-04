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
  get '/projects/completed/:completed', to: 'projects#completed'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
