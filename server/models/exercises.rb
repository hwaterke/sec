DB.create_table? :exercises do
  uuid :uuid, primary_key: true
  String :name, null: false, unique: true
  TrueClass :repetitions, default: false
  TrueClass :weight, default: false
  TrueClass :time, default: false
  TrueClass :distance, default: false
  String :description
  DateTime :created_at, null: false
  DateTime :updated_at, null: false
  foreign_key :user_uuid, :users, null: false, type: 'uuid'
end

class Exercise < Sequel::Model
  many_to_one :user, key: :user_uuid

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
