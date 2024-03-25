# Building 
FROM node:21-alpine AS builder 

WORKDIR /app

COPY ./package.json ./

RUN yarn install 

COPY . .

RUN yarn run build 

# Make Service Account Key 
RUN yarn generateKey


RUN ls src/key -a

RUN ls dist/key -a 
# Production 
FROM node:21-alpine AS production 

COPY --from=builder /app ./

CMD [ "yarn", "start:prod" ]