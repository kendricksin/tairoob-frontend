# Use an official Node runtime as the base image
FROM node:20.14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# # Install serve to run the application
# RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# # Define the command to run the app
CMD ["npm", "run", "build"]