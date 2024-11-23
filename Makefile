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
	@${exec} -c "npm run start:debug"
.PHONY: debug

#-------------------------------------------------------------------------------------------------------------------------
# Variables
#-------------------------------------------------------------------------------------------------------------------------

compose = docker compose
exec = docker exec -it node_gligue sh
