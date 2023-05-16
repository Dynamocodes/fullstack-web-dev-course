# Base stage for installing dependencies and copying files
FROM node:16 AS base
WORKDIR /usr/src/app
COPY . .
RUN npm ci

# Build stage
FROM base AS build
RUN npm run build

# Final stage
FROM node:16 AS final
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build /usr/src/app/build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
