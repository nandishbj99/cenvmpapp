FROM node:10-alpine as build-step
RUN mkdir -p /app1
WORKDIR /app1
COPY package.json /app1
RUN npm install
COPY . /app1
RUN npm run build --prod
FROM nginx:1.17.1-alpine
COPY --from=build-step /app1/dist/app /usr/share/nginx/html

