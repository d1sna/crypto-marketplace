FROM node:16.17.1
EXPOSE 80

RUN echo "$PWD"

COPY package.json /package.json
COPY package-lock.json /package-lock.json

RUN echo "$PWD"
WORKDIR /
RUN echo "$PWD"
RUN npm ci

COPY . /
RUN echo "$PWD"
RUN	ls -lh /

WORKDIR /
RUN npm run build

WORKDIR /
ENTRYPOINT [ "npm", "start"]