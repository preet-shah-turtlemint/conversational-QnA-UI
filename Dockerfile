FROM node:14-alpine as build-stage
COPY package.json yarn.lock ./
RUN rm -rf node_modules package-lock.json 
RUN yarn install && mkdir /app && mv ./node_modules ./app
WORKDIR /app
COPY . .
RUN yarn build
FROM nginx:1.24.0-alpine
COPY --from=build-stage /app/build /usr/src/app/
COPY ["campaign-management.conf","/etc/nginx/conf.d/default.conf"]
EXPOSE 80