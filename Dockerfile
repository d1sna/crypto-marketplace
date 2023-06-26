FROM node:16.17.1
EXPOSE 80

RUN echo "$PWD"

COPY package.json /package.json
COPY package-lock.json /package-lock.json

RUN echo "$PWD"
WORKDIR /
RUN echo "$PWD"
RUN npm install

COPY . /
RUN echo "$PWD"
RUN	ls -lh /

WORKDIR /
ENTRYPOINT [ "npm", "run", "dev"]