FROM node:10.16-alpine as node-server
LABEL maintainer="@jeffry_steven"
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
RUN npm install --quiet
RUN npm install nodemon -g --quiet
COPY . .
EXPOSE 80
CMD nodemon -L --watch . main.js