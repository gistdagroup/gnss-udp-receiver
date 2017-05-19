# GNSS UDP Receiver

[![Build Status](https://travis-ci.org/gitsda/gnss-udp-receiver.svg?branch=master)](https://travis-ci.org/gitsda/gnss-udp-receiver)
[![Coverage](https://codecov.io/gh/gitsda/gnss-udp-receiver/branch/master/graph/badge.svg)](https://codecov.io/gh/gitsda/gnss-udp-receiver)
[![Size](https://images.microbadger.com/badges/image/gistda/gnss-udp-receiver.svg)](https://microbadger.com/images/gistda/gnss-udp-receiver "Get your own image badge on microbadger.com")
[![Version](https://images.microbadger.com/badges/version/gistda/gnss-udp-receiver.svg)](https://microbadger.com/images/gistda/gnss-udp-receiver "Get your own version badge on microbadger.com")
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fgitsda%2Fgnss-udp-receiver.svg?type=shield)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fgitsda%2Fgnss-udp-receiver?ref=badge_shield)

## How to run
```
docker-compose build
docker-compose up -d
```

## Deploy with travis
See https://oncletom.io/2016/travis-ssh-deploy/

# Simulate udp package in OSX
```
nc -u 0.0.0.0 3000
hello

```
