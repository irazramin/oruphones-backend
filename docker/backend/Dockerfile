FROM node:18.16.0-slim

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y openssl nano vim curl telnet && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /app /app/backend

COPY ./backend /app/backend
COPY ./backend/package.json /app/backend/package.json

WORKDIR /app/backend

RUN npm install && \
    npm list --depth=0 && \
    npm cache verify

RUN npm run compile

CMD ["npm", "run", "dev"]