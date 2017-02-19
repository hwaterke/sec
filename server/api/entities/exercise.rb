module Sec
  module Entities
    class ExerciseRepresenter < Grape::Roar::Decorator
      include ::Roar::JSON
      property :uuid
      property :name
      property :repetitions
      property :weight
      property :time
      property :distance
      property :description
    end

    class Exercises < Grape::API
      before do
        env['warden'].authenticate :token
      end

      crud(Exercise, ExerciseRepresenter) do
        requires :name, type: String
        optional :repetitions, type: Boolean
        optional :weight, type: Boolean
        optional :time, type: Boolean
        optional :distance, type: Boolean
        optional :description, type: String
      end
    end
  end
end
