DB.create_table? :workout_sets do
  uuid :uuid, primary_key: true
  Integer :repetitions
  # Weight in grams
  Integer :weight
  Time :time, :only_time=>true
  # Distance in meters
  Integer :distance
  String :notes
  DateTime :executed_at, null: false
  DateTime :created_at, null: false
  DateTime :updated_at, null: false
  foreign_key :exercise_uuid, :exercises, null: false, type: 'uuid'
end

class WorkoutSet < Sequel::Model
  many_to_one :exercise, key: :exercise_uuid

  def before_create
    self.updated_at = Time.now
    self.created_at ||= self.updated_at
    self.executed_at ||= self.updated_at
    super
  end

  def before_update
    self.updated_at ||= Time.now
    super
  end
end
