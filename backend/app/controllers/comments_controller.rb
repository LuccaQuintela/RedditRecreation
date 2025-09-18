class CommentsController < ApplicationController
    before_action :set_post
    before_action :set_comment, only: [:show, :update, :destroy]

    def index
        @comments = @post.comments
        render json: @comments
    end

    def show
        render json: @comment
    end
    
    def create
        @comment = @post.comments.create(comment_params)
        render json: @comment
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
        params.require(:comment).permit(:content)
    end
end
