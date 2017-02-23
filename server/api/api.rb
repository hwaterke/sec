module Sec
  class API < Grape::API
    prefix :api
    format :json
    formatter :json, Grape::Formatter::Roar
    rescue_from Sequel::Error

    use Warden::JWTAuth::Middleware

    use Warden::Manager do |manager|
      manager.default_strategies :jwt
      manager.failure_app = lambda do |env|
        [
          401,
          {'Content-Type' => 'application/json'},
          [{error: 'Not authorized', message: env['warden.options'][:message]}.to_json]
        ]
      end
    end

    helpers WardenHelpers
    helpers CrudHelpers

    mount ::Auth::API
    mount ::Sec::Entities::Exercises
    mount ::Sec::Entities::WorkoutSets
  end
end
