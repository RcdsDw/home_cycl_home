
# Projet Home Cycl Home

Ce projet utilise Docker Compose pour orchestrer plusieurs services :

- **backend** : API Node.js avec Adonis.
- **frontend** : Interface utilisateur développée en React.
- **db** : Base de données PostgreSQL.
- **pgadmin** : Interface graphique pour gérer la base de données PostgreSQL.

## Prérequis

- [Docker](https://www.docker.com/) installé sur votre machine.
- [Docker Compose](https://docs.docker.com/compose/) installé (souvent inclus avec Docker Desktop).

## Structure du projet

- `home_cycl_home_api/` : Contient le code source de l'API backend.
- `home_cycl_home_front/` : Contient le code source de l'application frontend.
- `docker-compose.yml` : Fichier de configuration pour Docker Compose.

## Services

### Backend

- Dossier : `home_cycl_home_api`
- Exposé sur le port : `3333`
- Démarre avec la commande : `npm run dev`
- Variables d'environnement :
  - `DB_HOST`: Adresse de l'hôte pour PostgreSQL (db).
  - `DB_PORT`: Port PostgreSQL (5432).
  - `DB_USER`: Utilisateur PostgreSQL (postgres).
  - `DB_PASSWORD`: Mot de passe PostgreSQL (password).
  - `DB_NAME`: Nom de la base de données (home_cycl_home).

### Frontend

- Dossier : `home_cycl_home_front`
- Exposé sur le port : `4000`
- Démarre avec la commande : `npm start`

### Base de données (PostgreSQL)

- Image : `postgres:14`
- Exposé sur le port : `5544`
- Volume pour persister les données : `pgdata:/var/lib/postgresql/data`
- Variables d'environnement :
  - `POSTGRES_DB`: Nom de la base de données (home_cycl_home).
  - `POSTGRES_USER`: Utilisateur PostgreSQL (postgres).
  - `POSTGRES_PASSWORD`: Mot de passe PostgreSQL (password).

### pgAdmin

- Image : `dpage/pgadmin4`
- Exposé sur le port : `5050`
- Volume pour persister les données : `pgadmin-data:/var/lib/pgadmin`
- Variables d'environnement :
  - `PGADMIN_DEFAULT_EMAIL`: Email de connexion à pgAdmin ([admin@admin.com](mailto:admin@admin.com)).
  - `PGADMIN_DEFAULT_PASSWORD`: Mot de passe pgAdmin (admin).


## Installation et exécution

1. Cloner le dépôt :

   ```bash
   git clone <url-du-depot>
   cd <nom-du-repertoire>
   ```

2. Démarrer les services avec Docker Compose :

   ```bash
   docker-compose up --build
   ```

3. Accéder aux services :

   - Backend : [http://localhost:3333](http://localhost:3333)
   - Frontend : [http://localhost:3000](http://localhost:3000)
   - pgAdmin : [http://localhost:5050](http://localhost:5050)

4. Se connecter à pgAdmin :

   - Email : `admin@admin.com`
   - Mot de passe : `admin`
   - Ajouter une connexion à la base de données avec les paramètres suivants :
     - Host : `db`
     - Port : `5432`
     - Username : `postgres`
     - Password : `password`

## Volumes

Les volumes Docker permettent de persister les données entre les redémarrages :

- `pgdata` : Données PostgreSQL.
- `pgadmin-data` : Données pgAdmin.

## Migrations

- **Lancer les migrations** :

Pour entrer dans le container "backend" :
```
  docker compose exec backend bash
```
puis

```
  npm run migrateup
```

- **Lancer les seeders**

```
  node ace db:seed
```

## Commandes utiles

- **Démarrer les services** :

  ```bash
  docker compose up
  ```

- **Arrêter les services** :

  ```bash
  docker compose down
  ```

- **Reconstruire les images Docker** :

  ```bash
  docker compose up --build
  ```

- **Vérifier les logs des services** :

  ```bash
  docker compose logs -f
  ```

## Notes

- Assurez-vous que les ports utilisés (3000, 3333, 5050, 5444) ne sont pas déjà pris sur votre machine.
- Si vous souhaitez modifier les ports ou autres paramètres, éditez le fichier `docker-compose.yml`.
