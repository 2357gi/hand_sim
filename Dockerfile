#==================================================
# Build Layer
FROM node:14-slim as build

WORKDIR /app

COPY package.json package-lock.json ./
# COPY package.json package-lock.json ./

RUN npm install --non-interactive --frozen-lockfile
# RUN cpm ci

COPY . .

RUN yarn build

#==================================================
# Package install Layer
FROM node:14-slim as node_modules

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --non-interactive --frozen-lockfile --prod

#==================================================
# Run Layer
FROM gcr.io/distroless/nodejs14-debian11:debug

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/build .
COPY --from=node_modules /app/node_modules /app/node_modules

CMD ["index.js"]

