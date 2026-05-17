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


FROM eclipse-temurin:17-jdk-alpine AS springboot-build

WORKDIR /app/springboot

COPY ./springboot/.mvn ./.mvn
COPY ./springboot/mvnw ./mvnw
COPY ./springboot/pom.xml ./pom.xml
RUN chmod +x ./mvnw

COPY ./springboot/src ./src
RUN rm -rf ./src/main/resources/static && mkdir -p ./src/main/resources/static
COPY --from=client-build /app/client/dist ./src/main/resources/static
RUN ./mvnw clean package -DskipTests


FROM eclipse-temurin:17-jre-alpine AS springboot-runtime

WORKDIR /app

COPY --from=springboot-build /app/springboot/target/*.jar ./app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
