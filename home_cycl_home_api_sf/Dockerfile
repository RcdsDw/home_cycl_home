FROM php:8.4-fpm

# Install tools + extensions
RUN apt-get update && apt-get install -y \
    git unzip zip curl libpq-dev libsodium-dev libicu-dev libonig-dev libzip-dev libxml2-dev acl g++ make procps \
    && docker-php-ext-install pdo pdo_pgsql sodium intl zip opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Create a non-root user
RUN useradd -m symfony

WORKDIR /app

# Copy source
COPY . .

# Change ownership so the symfony user can write in /app
RUN chown -R symfony:symfony /app

# 👉 Définir une fausse DB pour le build
ARG FAKE_DATABASE_URL=sqlite:///:memory:
ENV DATABASE_URL=${FAKE_DATABASE_URL}

# Switch to symfony user for composer install
USER symfony

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Switch back to root for permissions and php-fpm
USER root

# Fix permissions for var (cache/logs)
RUN chown -R www-data:www-data var

CMD ["php-fpm"]
