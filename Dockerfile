FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# COPY nginx/templates /etc/nginx/templates
CMD ["nginx", "-g", "daemon off;"]
