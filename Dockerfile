# Use an official Node.js image as the base image
FROM node:16.14.2-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY . /app

# Install dependencies
RUN npm install

# Build the Node.js application
RUN npm run build

# Expose any necessary ports
EXPOSE 3000

# Start the application
CMD npm install -g serve && serve -s build
