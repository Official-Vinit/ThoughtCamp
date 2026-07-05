FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose port (default 8000)
EXPOSE 8000

# Start the server
CMD ["npm", "start"]
