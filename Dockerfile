FROM node:14

WORKDIR /home/node/app

COPY . .

RUN npm install 
RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "./dist/app.js"]