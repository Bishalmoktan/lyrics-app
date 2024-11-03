FROM node:20.12.0-alpine3.19

ARG RESEND_API_KEY

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
