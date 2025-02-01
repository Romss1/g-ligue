#-------------------------------------------------------------------------------------------------------------------------
# Command line
#-------------------------------------------------------------------------------------------------------------------------

install:
	@echo "Starting install"
	@${compose} up --build -d
	@echo "Let's go ! http://localhost:3000"
.PHONY: install

start:
	@echo "Starting project"
	@${compose} up -d
	@echo "Let's go ! http://localhost:3000"
.PHONY: start

stop:
	@echo "Stopping project"
	@${compose} stop
	@echo "Come back soon if you want to make progress !"
.PHONY: stop

remove-containers:
	 @${compose} down -v --rmi all --remove-orphans
.PHONY: remove-containers

bash:
	@${exec}
.PHONY: bash

lint:
	@${exec} -c "npm run lint --fix"
.PHONY: lint

format:
	@${exec} -c "npm run format"
.PHONY: format

debug:
	@echo "Debug project"
	@${compose} up
.PHONY: debug

prisma-push-db:
	@${exec} -c "npx prisma db push"
.PHONY: prisma-push-db

prisma-generate:
	@${exec} -c "npx prisma generate"
.PHONY: prisma-generate

prisma-generate-local:
	@npx prisma generate
.PHONY: prisma-generate-local

prisma-migrate-dev:
	@${exec} -c "npx prisma migrate dev"
.PHONY: prisma-migrate-dev

refresh-db-model: install prisma-generate prisma-push-db prisma-generate-local

#-------------------------------------------------------------------------------------------------------------------------
# Variables
#-------------------------------------------------------------------------------------------------------------------------

compose = docker compose
node_service_name = node_gligue-v2
exec = docker exec -it node_gligue-v2 sh
