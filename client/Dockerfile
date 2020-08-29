#### Stage 1: Build the react application
FROM node:12.4.0-alpine as build

# Configure the main working directory inside the docker image.
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install
# the dependencies. This is a separate step so the dependencies
# will be cached unless changes to one of those two files
# are made.
COPY package.json yarn.lock ./
RUN yarn

# Copy the main application
COPY ./ ./



# Build the application
RUN yarn build

#### Stage 2: Serve the React application from Nginx
FROM nginx:1.17

# Copy the react build from Stage 1
COPY --from=build /app/build /var/www
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to the Docker host, so we can access it
# from the outside.
