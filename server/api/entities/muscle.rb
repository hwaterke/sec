module Sec
  module Entities
    class Muscles < Grape::API
      before { authenticate! }

      resource :muscles do
        get do
          {data: MUSCLES}
        end
      end

    end
  end
end
