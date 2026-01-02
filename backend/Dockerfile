# Use Node.js 18 base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
