class SessionsController < ApplicationController
    def create 
        @user = User.find_by(email: params[:email].downcase)
        
        if @user&.authenticate(params[:password])
            @payload = { user_id: @user.id, exp: 24.hours.from_now.to_i }
            @token = JWT.encode(@payload, Rails.application.secret_key_base, 'HS256')
            render json: { token: @token, user: @user }, status: :ok
        else 
            render json: { error: "Invalid email or password" }, status: :unauthorized
        end
    end

    def destroy
        render json: { message: "Logged Out" }, status: :ok
    end

    private 

        def session_params
            params.require(:user).permit(:email, :password)
        end

end
