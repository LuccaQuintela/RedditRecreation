class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]
  before_action :set_posts, only: %i[ index ]

  # GET /posts
  def index
    render json: @posts.as_json(include: :user)
  end

  # GET /posts/1
  def show
    render json: @post.as_json(include: :user)
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.includes(:user).find(params.expect(:id))
    end

    def set_posts
      @posts = Post.includes(:user).all
    end

    # Only allow a list of trusted parameters through.
    def post_params
      @params = params.expect(post: [ :title, :body, :user_id ])
    end
end
