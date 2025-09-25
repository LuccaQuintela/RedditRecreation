class ApplicationController < ActionController::API
    private
        def authenticate_request
            header = request.headers['Authorization']
            token = header.split(' ').last if header
            begin
                decoded = JWT.decode(token, Rails.application.secret_key_base, true, algorithm: 'HS256')[0]
                @current_user = User.find(decoded["user_id"])
            rescue
                render json: { error: 'Unauthorized' }, status: :unauthorized
            end
        end
end
