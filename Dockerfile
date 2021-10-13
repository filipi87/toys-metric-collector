FROM node:14.15.1-alpine
LABEL maintainer=@filipi.fuchter

WORKDIR /app/toys-metric-collector

COPY . .

RUN (cd ./web-client; yarn install; yarn build;)
RUN (cd ./call-service; yarn install;)

CMD (cd ./call-service; yarn start;)