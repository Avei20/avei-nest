#Local Development 
FROM node:21-alpine AS development 

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN yarn install

COPY --chown=node:node . .

USER node

# Building 
FROM node:21-alpine AS builder 

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn run build 

ENV NODE_ENV production 

RUN yarn install --production

USER node 

# Production 
FROM node:21-alpine AS production 

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist 

CMD [ "yarn", "dist/main.js" ]