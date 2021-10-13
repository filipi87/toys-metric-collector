# Daily sample metric collector

Sample project based on daily to create a conference room, and monitor the statistics about all the conferences that have been made.

//TODO improve

## Dependencies for production
You will need these technologies in order to run the application
1. [docker](https://www.docker.com/)
2. [docker-compose](https://docs.docker.com/compose/)

## Build docker for production
- All this steps will be automated once integrated with the continuous integration.
- The registry will be the private registry used by the company, directly from gitlab, github, or from AWS, GCP or event internal private registry.
```
docker build -t {REGISTRY}/{PROJECT_NAME}:{VERSION} .
# Sample
docker build -t filipi87/toys-metric-collector:latest .
```

## Execute in production
```
# start
docker-compose up -d
# stop
docker-compose down
# watch logs
docker-compose logs -f
```

### TODO - Next steps for production
- Devops:
  - Configure the continuous integration to:
    - Run the tests;
    - create the docker images;
- web-client:
  - Configure lint at the code;
  - Create automated tests;
  - Add a log library
  - Improve the exception treatment
- call-service
  - Add a log library
  - Create more test scenarios
  - Improve the swagger documentation to map all the other possible errors code