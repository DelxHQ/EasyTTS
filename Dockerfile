FROM node:alpine

RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    python \
    ffmpeg

WORKDIR /bot

COPY . /bot

RUN npm i

CMD [ "npm", "start" ]
