# Use official Node.js 20.12.2 image
FROM node:18-alpine

# Install Python


RUN apk update && apk add --no-cache python3 py3-pip


# Install GCC and other necessary build tools
RUN apk update && apk add --no-cache g++

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD [ "node", "index.js" ]
