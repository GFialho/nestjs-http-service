# Makefile

.PHONY: build run test


build:
	docker build -t nest-api .

run:
	docker-compose up

test:
	docker-compose -f docker-compose.test.yml up --abort-on-container-exit
