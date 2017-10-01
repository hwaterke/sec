DB.create_table? :exercises do
  uuid :uuid, primary_key: true
  String :name, null: false, unique: true
  TrueClass :repetitions, default: false
  TrueClass :weight, default: false
  TrueClass :time, default: false
  TrueClass :distance, default: false
  String :main_muscle
  TrueClass :cardio, default: false

  TrueClass :is_machine, default: false
  TrueClass :with_dumbbell, default: false
  TrueClass :with_barbell, default: false

  String :description
  DateTime :created_at, null: false
  DateTime :updated_at, null: false
  foreign_key :user_uuid, :users, null: false, type: 'uuid'
end

class Exercise < Sequel::Model
  many_to_one :user, key: :user_uuid

  def validate
    super
    errors.add(:main_muscle, 'does not exist') unless main_muscle.nil? || MUSCLES.any? {|m| m['name'] === main_muscle }
    errors.add(:cardio, 'cannot be true with a muscle') if cardio and not main_muscle.nil?
  end

  def before_create
    self.updated_at = Time.now
    self.created_at ||= self.updated_at
    super
  end

  def before_update
    self.updated_at ||= Time.now
    super
  end
end
