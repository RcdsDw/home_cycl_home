FROM php:8.2-fpm

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libpq-dev \
    libsodium-dev \
    libicu-dev \
    libonig-dev \
    libzip-dev \
    libxml2-dev \
    acl \
    g++ \
    make \
    && docker-php-ext-install pdo pdo_pgsql sodium intl zip opcache \
    && apt-get clean

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Définir le dossier de travail
WORKDIR /app

# Copier le code source
COPY . .

# Installer les dépendances PHP
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Donner les bons droits à var/cache et var/log
RUN chown -R www-data:www-data var

# Supprimer le cache Symfony pour éviter les erreurs de build
RUN rm -rf var/cache/*

# Exposer le port FPM
EXPOSE 9000

# Démarrer php-fpm
CMD ["php-fpm"]
