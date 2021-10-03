FROM node:alpine

RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    python3 \
    ffmpeg \
    libtool \
    autoconf

WORKDIR /bot

COPY . /bot

RUN npm i

CMD [ "npm", "start" ]
