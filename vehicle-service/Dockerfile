FROM openjdk:11
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} ms-vehicle.jar
ENTRYPOINT ["java","-jar","/ms-vehicle.jar"]