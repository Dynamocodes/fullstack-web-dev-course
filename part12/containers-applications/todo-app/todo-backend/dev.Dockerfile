# Use node v16 as the base image.
FROM node:16

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy files from the current directory to the working directory in the container.
COPY --chown=node:node . .

# Install both production and development dependencies.
RUN npm ci --also=dev

# Set environment variable for detailed logs.
ENV DEBUG=todo-backend:*

# Change the user to 'node'.
USER node

# Run nodemon with the specified start script when the container starts.
CMD ["npm", "run", "dev"]
