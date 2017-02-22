FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN cd /usr/src/app/public && npm install

RUN cd /usr/src/app/public && npm run build

ENV NODE_PATH=./util
ENV DEBUG=astro-karma:*
ENV NODE_ENV=development

EXPOSE 3001
CMD [ "npm", "start" ]
