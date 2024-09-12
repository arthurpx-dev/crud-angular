FROM node:22 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM  nginx:alpine
COPY --from=builder /app/dist/crud-angular/browser usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
EXPOSE 80
CMD [ "nginx", "-g","daemon off;"]