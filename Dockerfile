FROM node:14.15.4-alpine3.10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD "npm" "run" "build"
CMD "npm" "run" "start:production"
EXPOSE 8080