module Sec
  module Entities
    class WorkoutSetRepresenter < Grape::Roar::Decorator
      include ::Roar::JSON
      property :uuid
      property :repetitions
      property :weight
      property :time
      property :distance
      property :notes
      property :executed_at
      property :exercise_uuid
    end

    class WorkoutSets < Grape::API
      before { authenticate! }

      helpers CrudHelpersBuilder.create_for_user WorkoutSet
      helpers do
        params :instance_params do
          optional :repetitions, type: Integer
          optional :weight, type: Integer
          optional :time, type: Time
          optional :distance, type: Integer
          optional :notes, type: String
          optional :executed_at
          requires :exercise_uuid, type: String
        end
      end

      crud_routes WorkoutSet.name, WorkoutSetRepresenter
    end
  end
end
