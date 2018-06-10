FROM node:8.11.2-alpine

WORKDIR /root

# Set up
RUN apk add --update

RUN npm install -g loopback-cli

RUN npm install -g nodemon

ENTRYPOINT nodemon -x 'node .' -w common -w server

# uncomment for production and build new image
# ENTRYPOINT nodemon node .
