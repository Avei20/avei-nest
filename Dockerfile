# Building 
FROM node:21-alpine AS builder 

WORKDIR /app

COPY ./package.json ./

RUN yarn install 

COPY . .

RUN yarn run build 

# Production 
FROM node:21-alpine AS production 

COPY --from=builder /app ./

CMD [ "/bin/ash", "-c", "yarn start:prod" ]