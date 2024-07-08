# Use an official Node runtime as the base image
FROM node:20.14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install http-server
RUN npm install -g http-server

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Create env variable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Expose the port the app runs on
EXPOSE 3000

# # Define the command to run the app
CMD npm run build && http-server dist -p 3000
