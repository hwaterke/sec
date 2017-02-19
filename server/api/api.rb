module Sec
  class API < Grape::API
    prefix :api
    format :json
    formatter :json, Grape::Formatter::Roar
    rescue_from Sequel::Error

    use Warden::Manager do |manager|
      manager.default_strategies :token
      manager.failure_app = lambda do |env|
        [
          401,
          {'Content-Type' => 'application/json'},
          [{error: 'Not authorized'}.to_json]
        ]
      end
    end

    helpers CrudHelpers

    mount ::Sec::Entities::Exercises
    mount ::Sec::Entities::WorkoutSets
  end
end
