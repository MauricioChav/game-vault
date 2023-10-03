FROM node

WORKDIR /app

#Node modules
COPY package.json /app

RUN npm install

#Connection to db
COPY src/db/mongoose.js /app

COPY . /app

EXPOSE 9000

CMD [ "npm", "start" ]