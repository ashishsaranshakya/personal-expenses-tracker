FROM node:18-bullseye AS client-build

WORKDIR /app/client

COPY ./client/package*.json ./
RUN npm install

COPY ./client/public/ ./public/
COPY ./client/src/ ./src/
COPY ./client/index.html ./
COPY ./client/vite.config.js ./
COPY ./client/.eslintrc.cjs ./
RUN npm run build



FROM node:18-bullseye

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY ./src ./src
COPY ./index.js ./
COPY ./.env ./
COPY --from=client-build /app/client/dist ./client/dist

EXPOSE 3000
CMD ["npm", "run", "prod"]