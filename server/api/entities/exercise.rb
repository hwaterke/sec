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
      property :main_muscle
      property :cardio
      property :description
    end

    class Exercises < Grape::API
      before { authenticate! }

      helpers CrudHelpersBuilder.create_for_user Exercise
      helpers do
        params :instance_params do
          requires :name, type: String
          optional :repetitions, type: Boolean
          optional :weight, type: Boolean
          optional :time, type: Boolean
          optional :distance, type: Boolean
          optional :main_muscle, type: String
          optional :cardio, type: Boolean
          optional :description, type: String
        end
      end

      crud_routes Exercise.name, ExerciseRepresenter
    end
  end
end
