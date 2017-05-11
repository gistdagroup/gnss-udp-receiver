#!/bin/sh

docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS hub.docker.com
docker push gistda/gnss-udp-receiver
