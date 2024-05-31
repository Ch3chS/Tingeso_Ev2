FROM openjdk:11
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} ms-repairvehicle.jar
ENTRYPOINT ["java","-jar","/ms-repairvehicle.jar"]