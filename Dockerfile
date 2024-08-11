# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set build arguments
ARG CLOUDFLARE_API_KEY

# Set environment variable
ENV CLOUDFLARE_API_KEY=${CLOUDFLARE_API_KEY}

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
