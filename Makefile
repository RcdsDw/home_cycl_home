# Makefile

COMPOSE = docker-compose
COMPOSE_DEV = $(COMPOSE)
COMPOSE_PROD = $(COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml

.PHONY: up down build logs restart dev prod

dev-build: 
	$(COMPOSE_DEV) up --build

# Développement
dev: 
	$(COMPOSE_DEV) up

# Production
prod:
	$(COMPOSE_PROD) up -d --build

# Stop les conteneurs
down:
	$(COMPOSE) down

# Rebuild uniquement
build:
	$(COMPOSE) build

# Logs
logs:
	$(COMPOSE) logs -f

# Restart
restart:
	$(COMPOSE) down
	$(COMPOSE) up --build
