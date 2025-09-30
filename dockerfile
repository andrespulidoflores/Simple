# Use official Node.js image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app code
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "index.js"]