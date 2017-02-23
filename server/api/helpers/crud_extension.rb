module Grape
  class API
    class << self

      # This extension assumes the Model has a primary key called 'id'

      def plural_of(type)
        type.name.pluralize.underscore.to_sym
      end

      def get_one(type, representer, primary_key_property_name, owner_property_name)
        desc "Returns one #{type}"
        params do
          requires :id, type: String, desc: "The id of the #{type}"
        end
        get ':id' do
          entry = find_instance(type, params[:id], primary_key_property_name, owner_property_name)
          present entry, with: representer
        end
      end

      def get_all(type, representer, primary_key_property_name, owner_property_name)
        list_representer = Class.new(Grape::Roar::Decorator) do
          include ::Roar::JSON
          collection :entries, extend: representer, as: :data
        end

        desc "Returns all #{type}"
        get do
          entries = type.where({owner_property_name => connected_user[primary_key_property_name]}).all
          present entries, with: list_representer
        end
      end

      def create_with(type, representer, primary_key_property_name, owner_property_name, &block)
        desc "Creates a new #{type}"
        params(&block)
        post do
          entry = type.create(declared(params).merge({owner_property_name => connected_user[primary_key_property_name]}))
          present entry, with: representer
        end
      end

      def update_with(type, representer, primary_key_property_name, owner_property_name, &block)
        desc "Updates an existing #{type}"
        params do
          requires :id, type: String, desc: "The id of the #{type}"
          self.instance_eval(&block)
        end
        patch ':id' do
          entry = find_instance(type, params[:id], primary_key_property_name, owner_property_name)

          update_keys = declared(params).dup
          update_keys.delete(primary_key_property_name)

          entry.update(update_keys)
          present entry, with: representer
        end
      end

      def delete_one(type, representer, primary_key_property_name, owner_property_name)
        desc "Deletes an existing #{type}"
        params do
          requires :id, type: String, desc: "The id of the #{type}"
        end
        delete ':id' do
          entry = find_instance(type, params[:id], primary_key_property_name, owner_property_name)
          present entry.destroy, with: representer
        end
      end

      def crud(type, representer, primary_key_property_name, owner_property_name, &block)
        resource plural_of(type) do
          get_one(type, representer, primary_key_property_name, owner_property_name)
          get_all(type, representer, primary_key_property_name, owner_property_name)
          create_with(type, representer, primary_key_property_name, owner_property_name, &block)
          update_with(type, representer, primary_key_property_name, owner_property_name, &block)
          delete_one(type, representer, primary_key_property_name, owner_property_name)
        end
      end

    end
  end
end
