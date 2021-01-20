FROM node:14

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install 

COPY . .
RUN npx tsc 
RUN npm run copyfiles

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "./dist/app.js"]