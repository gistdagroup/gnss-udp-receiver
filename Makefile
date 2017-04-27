.PHONY: build push

build:
	docker build -t gistda/gnss-udp-receiver .

push:
	docker push gistda/gnss-udp-receiver

default: build
