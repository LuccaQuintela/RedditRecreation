class CommentsController < ApplicationController
    before_action :set_post
    before_action :set_comment, only: %i[show update destroy]
    before_action :authenticate_request, only: %i[create update destroy]

    def index
        @comments = @post.comments
        render json: @comments.as_json(include: :user)
    end

    def show
        render json: @comment
    end
    
    def create
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
end
