FROM nginx:alpine
COPY /dist /usr/share/nginx/html
COPY /nginx/conf.d /etc/nginx/conf.d

RUN echo "Rebuild $(date)" > /usr/share/nginx/html/version.txt

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
