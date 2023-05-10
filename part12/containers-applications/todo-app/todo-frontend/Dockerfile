# Base stage for installing dependencies and copying files
FROM node:16 AS base
WORKDIR /usr/src/app
COPY . .
RUN npm ci

# Testing stage
FROM base AS test
RUN CI=true npm test

# Build stage
FROM test AS build
ENV REACT_APP_BACKEND_URL=http://localhost:3001
RUN npm run build

# Final stage
FROM node:16 AS final
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build /usr/src/app/build
RUN npm install -g serve
CMD ["serve", "build"]
