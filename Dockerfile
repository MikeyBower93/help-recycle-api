FROM node:14.15.4-alpine3.10
ENV NODE_ENV=production
RUN mkdir -p usr/src/app/node_modules && mkdir -p usr/src/app/dist
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . . 
RUN tsc
CMD ["npm", "run", "start:production"]
EXPOSE 8080