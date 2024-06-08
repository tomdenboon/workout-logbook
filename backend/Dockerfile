FROM gradle:8-jdk17 AS build

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:17

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/workout-logbook.jar /app/workout-logbook.jar

ENTRYPOINT ["java","-jar","/app/workout-logbook.jar"]