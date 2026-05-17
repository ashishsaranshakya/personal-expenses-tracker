FROM node:18-bullseye AS client-build

WORKDIR /app/client

COPY ./client/package.json ./package.json
COPY ./client/package-lock.json ./package-lock.json
RUN npm ci

COPY ./client/public ./public
COPY ./client/src ./src
COPY ./client/index.html ./index.html
COPY ./client/vite.config.js ./vite.config.js
COPY ./client/.eslintrc.cjs ./.eslintrc.cjs
RUN npm run build


FROM node:18-bullseye AS express-runtime

WORKDIR /app/express

COPY ./express/package.json ./package.json
COPY ./express/package-lock.json ./package-lock.json
RUN npm ci --omit=dev

COPY ./express/src ./src
COPY ./express/index.js ./index.js
COPY --from=client-build /app/client/dist ../client/dist

EXPOSE 3000
CMD ["node", "index.js"]