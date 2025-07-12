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

# Cache clear
cache-clear:
	$(COMPOSE) exec backend php bin/console cache:clear

# Migrations
migration:
	$(COMPOSE) exec backend php bin/console make:migration

# Migrate
migrate:
	$(COMPOSE) exec backend php bin/console doctrine:migrations:migrate

# Fixtures
fixtures:
	${COMPOSE} exec backend php bin/console doctrine:fixtures:load

# Connect to db
db: 
	$(COMPOSE) exec db psql -U postgres -d home_cycl_home