# FrontKit [![Run project](https://s3-sa-east-1.amazonaws.com/assets.azk.io/run-project.png)](http://run.azk.io/start/?repo=CodersAKL/FrontKit&ref=azkfile)

Front end system
##### JADE + browserify + browserSync + SASS + Uglify + image optimization

You have 4 options to run project. I recommend to try run project using AZK

## Run project Locally
1. [Install node](https://nodejs.org/en/download/)
1. `npm install -g gulp`
1. `npm install`
1. `gulp`
1. `node server.js` Run static server

## Run project With docker.
 If you don't want to install node and other global packages. You need
1. [docker](https://docs.docker.com/engine/installation/)
1. `service docker start` Start docker service if not running
1. `docker build -t frontkit ./docker` Build vm with name "frontkit"
1. `docker run -itd --name frontkit -p 127.0.0.1:80:80 -p 127.0.0.1:3000:3000 -v ${PWD}:/var/www frontkit || docker start frontkit`
1. `docker exec --user www-data -it frontkit bash` Connect to container

## Run project using AZK
1. Install azk
    * Mac `curl -sSL http://azk.io/install.sh | sh`
    * Linux `wget -nv http://azk.io/install.sh -O- -t 2 -T 10 | sh`
1. `azk start -vv` Run project
1. `azk shell` Connect to container
1. `azk stop` To stop the project

## Run project with docker-compose
1. [Install docker](https://docs.docker.com/engine/installation/)
1. [Install docker-compose](https://docs.docker.com/compose/install/)
1. `./vm up` Run container
1. `./vm ssh` Connect to container
1. Install npm modules and run tasks
    * `./vm shell` Connect to container
    * `npm install` Install npm dependencies
    * `gulp` Build and run BrowserSync

1. `./vm stop` Stop the container
> `./vm` Is helper for docker-compose

### Gulp commands

1. `npm install` Install dependencies
1. `gulp` Run default task
1. `gulp watch` Watch files for changes
1. `gylp build:clean` Cleanup dist directory
1. `gulp scss` Compile css
1. `gulp js` Compile js
1. `gulp jade` Compile jade files
1. `gulp images` Optimize images
