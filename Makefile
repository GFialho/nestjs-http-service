# Makefile

.PHONY: build run test


build:
	docker build -t nest-api .

run:
	docker-compose up -d && npx prisma migrate dev && npx prisma db seed

test:
	npm run test
