FROM node:alpine

RUN apk add --no-cache \
    build-base \
    g++ \
    python3 \
    ffmpeg \
    libtool \
    autoconf \
    automake

WORKDIR /bot

COPY . /bot

RUN npm i

CMD [ "npm", "start" ]
