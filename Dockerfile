FROM node:latest

WORKDIR /usr/src/api

COPY . .
COPY ./.env ./.env

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]
