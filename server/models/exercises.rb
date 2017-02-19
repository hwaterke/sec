DB.create_table? :exercises do
  uuid :uuid, primary_key: true
  String :name, null: false, unique: true
  TrueClass :repetitions
  TrueClass :weight
  TrueClass :time
  TrueClass :distance
  String :description
  DateTime :created_at, null: false
  DateTime :updated_at, null: false
end

class Exercise < Sequel::Model
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
