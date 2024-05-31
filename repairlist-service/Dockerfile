FROM openjdk:11
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} ms-repairlist.jar
ENTRYPOINT ["java","-jar","/ms-repairlist.jar"]