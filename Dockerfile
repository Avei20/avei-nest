# Building 
FROM node:21-alpine AS builder 

WORKDIR /app

COPY ./package.json ./

RUN yarn install 

COPY . .

# Make Service Account Key 
RUN yarn prebuild

RUN yarn run build 

# Production 
FROM node:21-alpine AS production 

COPY --from=builder /app ./

CMD [ "yarn", "start:prod" ]