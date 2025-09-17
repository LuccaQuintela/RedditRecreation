# Make sure RUBY_VERSION matches the Ruby version in .ruby-version
ARG RUBY_VERSION=3.3.9
# FROM ghcr.io/rails/devcontainer/images/ruby:$RUBY_VERSION
FROM docker.io/library/ruby:$RUBY_VERSION

# Set working directory
WORKDIR /app

# Install bundler and dependencies
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy the rest of your code
COPY . .

# Default command (overridden in docker-compose.yml if needed)
CMD ["bash", "-c", "bin/rails s -b 0.0.0.0 -p 3000"]