FROM node:15.5.1

WORKDIR /home/node/app

RUN npm i -g npm@7.4.2

COPY package*.json ./
RUN npm install 

COPY . .
RUN npx tsc 
RUN npm run copyfiles

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "./dist/app.js"]