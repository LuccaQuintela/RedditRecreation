class CommentsController < ApplicationController
    before_action :set_post
    before_action :set_comment, only: [:show, :update, :destroy]

    def index
        @comments = @post.comments
        render json: @comments.as_json(include: :user)
    end

    def show
        render json: @comment
    end
    
    def create
        return unless authenticate_request
        @comment = @post.comments.new(comment_params)
        @comment.user = @current_user
        if @comment.save
            render json: @comment.as_json(include: :user), status: :created
        else 
            render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def update
        @comment.update(comment_params)
        render json: @comment
    end
    
    def destroy
        @comment.destroy
        render json: { message: "Comment deleted" }
    end
    
    private
    
        def set_post
            @post = Post.find(params[:post_id])
        end
        
        def set_comment
            @comment = @post.comments.find(params[:id])
        end
        
        def comment_params
            params.require(:comment).permit(:body, :parent_id)
        end

        def authenticate_request
            header = request.headers['Authorization']
            token = header.split(' ').last if header
            begin
                decoded = JWT.decode(token, Rails.application.secret_key_base, true, algorithm: 'HS256')[0]
                @current_user = User.find(decoded["user_id"])
                true
            rescue
                render json: { error: 'Unauthorized' }, status: :unauthorized
                false
            end
        end
end
