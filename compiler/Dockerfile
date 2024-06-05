# Use official Node.js 20.12.2 image
FROM node:20.12.2

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip && ln -s /usr/bin/python3 /usr/bin/python

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
