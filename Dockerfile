FROM node:20-alpine

WORKDIR /app
COPY . .

RUN rm -rf node_modules
RUN npm install && npx tsc

CMD npx prisma db push && node src/infra/http/server.ts

EXPOSE 4000