FROM nginx:1.21-alpine

ARG IS_BETA=true
ARG IS_PRODUCTION=false


LABEL com.accenture.ix.devops.is-production=${IS_PRODUCTION} \
      com.accenture.ix.devops.ix-beta=${IS_BETA}

USER 0

RUN rm -f /etc/nginx/conf.d/default.conf

# Copy the build React web application to the default Nginx HTML directory
COPY --chown=nginx:nginx build /usr/share/nginx/html

# Copy the built nginx.conf file to the base Nginx configuration directory
COPY --chown=nginx:nginx  ./conf/nginx.conf /etc/nginx/

#USER nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]