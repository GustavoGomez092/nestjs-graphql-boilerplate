FROM node:20-alpine as dev

# install open ssl
RUN apk add openssl

# set working directory
WORKDIR /opt/app

# install prisma and copy required files
RUN npm install -g prisma
COPY ./ ./prisma/

FROM dev as prod

RUN ulimit -u 4096 -n 4096

CMD ["prisma", "migrate", "deploy", "--skip-generate"]