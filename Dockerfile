FROM node:23-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apk add libc6-compat
COPY . .
EXPOSE 8081
CMD ["npm", "run", "web"]