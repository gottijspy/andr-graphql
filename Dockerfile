FROM node:14.17-alpine

RUN apk --no-cache add --virtual .builds-deps build-base python3

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm ci

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

EXPOSE 8085
CMD [ "npm", "run", "start:dev" ]