# --- Stage 1: Build the React App ---

# Use a specific Node.js version (Long Term Support)
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
# We copy these first to cache dependencies
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Run the 'build' script (defined in your package.json)
# This creates an optimized 'dist' or 'build' folder
RUN npm run build

# --- Stage 2: Serve the Static Files with Nginx ---

# Use a lightweight, official nginx image
FROM nginx:1.25-alpine

# Copy the optimized build output from the 'build' stage
# (Assumes your build script creates a 'dist' folder. 
# If it creates a 'build' folder, change 'dist' to 'build')
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (the default nginx port)
EXPOSE 80

# The default nginx command starts the server automatically.