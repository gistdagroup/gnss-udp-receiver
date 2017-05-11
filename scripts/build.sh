#!/usr/bin/env bash

set -ev

docker build -t gistda/gnss-udp-receiver .
docekr push gistda/gnss-udp-receiver
