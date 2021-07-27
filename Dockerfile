FROM openjdk:11-jdk-slim
USER root
RUN adduser spring && adduser spring spring

USER spring:spring
COPY ./build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]