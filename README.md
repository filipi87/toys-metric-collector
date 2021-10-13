# Daily sample metric collector

Highly simplified project based on Daily.co, for creating video calls, collecting metrics from the call and see the results (metrics viewer).

From the home page, the user can:
- New meeting:
  - A new daily room will be created;
  - To other users join the same conference, you just need to send then the link that is specified in the browser. It will be something like ```http://localhost:3000/call/r-1634087587944```.
  - During the conference, video statistics are collected each 15 seconds from all the participants;
  - When the user leaves the conference, the room is removed from Daily;
- Dashboard
  - Lists all the meetings that have been created;
    - Important: the meetins are kept in memory at the server, so if you restart the server, you will lose the history;
  - Can click in a specific meeting to see the metrics that have been collected;

## Dependencies for production
You will need these technologies in order to run the application
1. [docker](https://www.docker.com/)
2. [docker-compose](https://docs.docker.com/compose/)

## Build docker for production
- All this steps will be automated once integrated with the continuous integration.
- The registry will be the private registry used by the company, directly from gitlab, github, or from AWS, GCP or event internal private registry.
```
docker build -t {REGISTRY}/{PROJECT_NAME}:{VERSION} .
# this image has already been published as sample
docker build -t filipi87/toys-metric-collector:latest .
```

## Before execute in production
Before running, you will need to edit the file ```docker-compose.yml``` and configure your daily api key. 
Uncomment both lines that are commented, and replace ```YOUR_DAILY_API_KEY``` by your daily api key.

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
  - Improve how we are creating and showing the graphs
- call-service
  - Add a log library
  - Create more test scenarios
  - Improve the swagger documentation to map all the other possible errors code
  - Save the date and time at the statistics to create better analysis
  
### For development
For development, you are able to run the ```web-client``` that is the web interface or the ```call-service```, that is the server side.
More details about how to execute those projects can be found here:
- [call-service](call-service/README.md)
- [web-client](web-client/README.md)