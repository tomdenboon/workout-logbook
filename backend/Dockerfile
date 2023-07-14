FROM gradle:8-jdk17-jammy AS builder

ENV APP_HOME=/home/gradle
WORKDIR $APP_HOME
COPY build.gradle settings.gradle gradlew $APP_HOME
COPY gradle $APP_HOME/gradle
RUN ./gradlew build || return 0 
COPY . .
RUN ./gradlew build

FROM builder AS development

CMD ["gradle", "bootRun"]