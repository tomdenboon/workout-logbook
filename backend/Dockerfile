FROM gradle:8-jdk17 AS build

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:17

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/monkeylog.jar /app/monkeylog.jar

ENTRYPOINT ["java","-jar","/app/monkeylog.jar"]