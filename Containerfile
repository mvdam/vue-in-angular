# Build Angular
FROM node:alpine AS angular-builder
WORKDIR /app
COPY ./angular-app .
RUN npm ci && npm run build

# Build Vue
FROM node:alpine AS vue-builder
WORKDIR /app
COPY ./vue-app .
RUN npm ci && npm run build

# Setup nginx
FROM nginx:alpine as runner

# Copy build artifacts
COPY --from=angular-builder /app/dist/angular-app/browser /usr/share/nginx/html
COPY --from=vue-builder /app/dist /usr/share/nginx/html/vue-standalone

# Copy nginx config
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080