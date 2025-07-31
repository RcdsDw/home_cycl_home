
# Projet Home Cycl Home

Projet full stack orchestré avec Docker Compose :

- **backend** : API Symfony (API Platform).
- **frontend** : Application React.
- **db** : Base de données PostgreSQL.
- **nginx** : Serveur web et reverse proxy.

## Prérequis

- [Docker](https://www.docker.com/) installé sur votre machine.
- [Docker Compose](https://docs.docker.com/compose/) installé (souvent inclus avec Docker Desktop).
- Fichier .env configuré avec les variables d'environnement.

## Structure du projet

.
├── home_cycl_home_api_sf/          # Code source de l'API Symfony
│   ├── nginx/
│   │   └── Dockerfile              # Configuration Nginx
│   └── Dockerfile                  # Configuration du conteneur backend
├── docker-compose.yml              # Configuration Docker Compose
├── Makefile                        # Commandes simplifiées
└── README.md

## Services

### Backend

- Dossier : `home_cycl_home_api_sf`
- Framework : Symfony avec API Platform
- Langage : PHP
- Volume : Code source monté pour le hot-reload
- Dépendances : Volume dédié pour vendor/
- Variables d'environnement :
  - `DATABASE_URL` : URL de connexion à PostgreSQL

### Frontend

- Dossier : `home_cycl_home_front`
- Exposé sur le port : `4000`
- Démarre avec la commande : `npm start`

### Base de données (PostgreSQL  + PostGIS)

- Image : `postgis/postgis:14-3.3`
- Port exposé : 5544 → 5432
- Extension : PostGIS pour les fonctionnalités géospatiales
- Volume : pgdata pour persister les données
- Variables d'environnement :
  - `POSTGRES_DB`: Nom de la base de données.
  - `POSTGRES_USER`: Utilisateur PostgreSQL.
  - `POSTGRES_PASSWORD`: Mot de passe PostgreSQL.

### Nginx

- Port exposé : 82 → 80
- Rôle : Serveur web et reverse proxy vers Symfony
- Configuration : Dockerfile personnalisé dans nginx/
- Volume partagé : public_data pour les fichiers statiques

## Configuration

1. Créez un fichier .env à la racine du projet avec les variables suivantes :

### Base de données
`POSTGRES_DB`=home_cycl_home
`POSTGRES_USER`=postgres
`POSTGRES_PASSWORD`=your_password_here

### URL de connexion Symfony
DATABASE_URL=postgresql://postgres:your_password_here@db:5432/home_cycl_home

## Installation et exécution

1. Cloner le dépôt :

```bash
  git clone <url-du-depot>
  cd home-cycl-home
```

2. Configuration :

  Créez et configurez votre fichier .env avec vos paramètres.

3. Démarrage en développement :

### Avec le Makefile (recommandé)
make dev-build

### Ou directement avec Docker Compose
docker-compose up --build

3. Accéder aux services :

   - Application : [http://localhost:82](http://localhost:82)
   - API Symfony : Accessible via Nginx sur le port 82
   - Base de données : [http://localhost:5544](http://localhost:5544)
   - Documentation API Platform : [http://localhost:82/api/docs](http://localhost:82/api/docs)

## Commandes utiles (Makefile)

### Gestion des conteneurs

```bash
  # Démarrer en développement avec build
  make dev-build

  # Démarrer en développement
  make dev

  # Démarrer en production
  make prod

  # Arrêter les services
  make down

  # Reconstruire les images
  make build

  # Voir les logs en temps réel
  make logs

  # Redémarrer complètement
  make restart
```

### Gestion de l'application Symfony

```bash
  # Vider le cache Symfony
  make cache-clear

  # Créer une nouvelle migration
  make migration

  # Exécuter les migrations
  make migrate

  # Charger les fixtures (données de test)
  make fixtures
```

### Base de données

```bash
  # Se connecter directement à PostgreSQL
  make db
```

## Développement

### Structure des volumes

- `symfony_vendor` : Dépendances PHP pour éviter les conflits de plateformes
- `public_data` : Fichiers statiques partagés entre Symfony et Nginx
- `pgdata` : Données PostgreSQL persistantes

### Hot-reload

Le code source est monté dans le conteneur backend, permettant :

Modification en temps réel du code PHP
Rechargement automatique des changements
Développement sans reconstruction des conteneurs

### Réseau

Tous les services communiquent via le réseau Docker `app-network`.

## Base de données PostGIS

PostGIS ajoute des fonctionnalités géospatiales à PostgreSQL :

- Types de données géométriques
- Fonctions de calcul de distances
- Index spatiaux
- Support des systèmes de coordonnées

### Connexion externe

Pour vous connecter avec un client externe (DBeaver, pgAdmin, etc.) :

- Host : `localhost`
- Port : `5544`
- Database : Valeur de `POSTGRES_DB`
- Username : Valeur de `POSTGRES_USER`
- Password : Valeur de `POSTGRES_PASSWORD`

## Déploiement en production

```bash
  # Démarrer en mode production (détaché)
  make prod
```

Le mode production utilise une configuration optimisée avec :

- Variables d'environnement spécifiques
- Optimisations de performance
- Configuration de sécurité renforcée

## Dépannage

### Problèmes courants

1. Port déjà utilisé : Vérifiez que les ports 82 et 5544 sont libres
2. Permissions : Assurez-vous que Docker a les permissions sur les dossiers
3. Variables d'environnement : Vérifiez votre fichier .env

### Logs de débogage

```bash
  # Voir tous les logs
  make logs

  # Logs d'un service spécifique
  docker-compose logs -f backend
  docker-compose logs -f nginx
  docker-compose logs -f db
```

### Nettoyer l'environnement

```bash
  # Supprimer les conteneurs et volumes
  docker-compose down -v

  # Nettoyer les images inutilisées
  docker system prune
```

## Notes techniques

- L'extension PostGIS est automatiquement activée dans PostgreSQL
- Nginx est configuré pour servir les assets Symfony et faire du reverse proxy
- Le hot-reload fonctionne grâce au volume monté du code source
- Les dépendances Composer sont isolées dans un volume dédié