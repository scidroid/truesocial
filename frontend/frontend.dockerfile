FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY frontend/package.json frontend/yarn.lock /app
RUN yarn install --frozen-lockfile

COPY frontend/ /app

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]