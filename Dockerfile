FROM node:15.5.1

WORKDIR /home/node/app

COPY . .

RUN npm install 
RUN npx tsc
RUN npm run copyfiles

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "./dist/app.js"]