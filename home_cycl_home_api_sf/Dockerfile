FROM php:8.4-fpm

COPY php.ini /usr/local/etc/php/conf.d/docker-php-config.ini

# Install tools + extensions
RUN apt-get update && apt-get install -y \
    git unzip zip curl libpq-dev libsodium-dev libicu-dev libonig-dev libzip-dev libxml2-dev acl g++ make procps \
    && docker-php-ext-install pdo pdo_pgsql sodium intl zip opcache \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set workdir
WORKDIR /app

# Copy source
COPY . .

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data var

# Start Symfony dev server
CMD ["php-fpm"]