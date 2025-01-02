# Utilise une image Node officielle
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code dans le conteneur
COPY . .

# Exposer le port utilisé par Adonis
EXPOSE 3333

# Lancer l'application
CMD ["npm", "run", "dev"]
