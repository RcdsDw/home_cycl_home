# Utilise une image Node officielle pour le build
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code
COPY . .

# Exposer le port utilisé par React (3000)
EXPOSE 3000

# Lancer le serveur React
CMD ["npm", "start"]
