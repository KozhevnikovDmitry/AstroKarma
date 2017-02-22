# AstroKarma

Employee karma service for Astrosoft

### Now dockerized! 
In order to run the app in docker do the following:

1. Go to project root and run `docker-compose build`
2. After the command execution is finished, run `docker-compose up -d` (or `docker-compose up`, if you want to observe logs from both backend and mongo containers in console)

After that, you can go to <docker-host>:3001 in order to check that application is working. 

*What this commands do:*
The `docker-compose build` command downloads all dependencies for both backend and frontend parts of the app, builds frontend, packs the app into particular docker image and downloads image with mongo db. Then, the `docker-compose up` command launch containers with the app and mongo and provide the app with access to mongo container.