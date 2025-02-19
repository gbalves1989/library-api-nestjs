FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g npm@9.8.1

COPY . .

RUN npx prisma generate
RUN npm run build

CMD ["node", "dist/main.js"]
