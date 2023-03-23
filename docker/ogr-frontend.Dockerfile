FROM node:18-alpine as building

WORKDIR /app
COPY ogr-frontend/package*.json /app
RUN npm install
COPY ./ogr-frontend /app
RUN npm run build
RUN rm -rf /app/node_modules && npm cache clean --force

FROM nginx:stable-alpine
COPY --from=building /app/dist /bin/www
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
