module CrudHelpers
  def find_instance(type, primary_key, primary_key_property_name, owner_property_name)
    instance = type.first({primary_key_property_name => primary_key, owner_property_name => connected_user[primary_key_property_name]})
    error! :not_found, 404 unless instance
    instance
  end
end
