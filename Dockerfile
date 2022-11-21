FROM node

RUN mkdir -p /usr/src/web

RUN chmod -R 777 /usr/src/web

WORKDIR /usr/src/web

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .