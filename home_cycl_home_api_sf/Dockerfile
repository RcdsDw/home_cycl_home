FROM php:8.2-cli

# Install tools + extensions
RUN apt-get update && apt-get install -y \
    git unzip zip curl libpq-dev libsodium-dev libicu-dev libonig-dev libzip-dev libxml2-dev acl g++ make procps \
    && docker-php-ext-install pdo pdo_pgsql sodium intl zip opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash && \
    mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Set workdir
WORKDIR /app

# Copy source
COPY . .

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data var

# Expose dev port
EXPOSE 8000

# Start Symfony dev server
CMD ["symfony", "serve", "--no-tls", "--allow-http", "--port=8000"]
