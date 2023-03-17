Rails.application.routes.draw do
  resources :admins do
    resources :projects
  end
  resources :employees do
    resources :projects 
  end

  resources :projects do
    resources :admins
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
