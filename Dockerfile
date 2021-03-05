FROM alpine

RUN apk add \
  chromium \
  chromium-chromedriver \
  nodejs \
  npm

WORKDIR /opt/app/
COPY . .

RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]