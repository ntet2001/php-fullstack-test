FROM php:8.1.2-alpine

RUN apk add --no-cache \
    bash \
    curl \
    git \
    unzip \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    zlib-dev \
    jpeg-dev \
    freetype-dev


RUN docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install -j$(nproc) \
        gd \
        intl \
        mbstring \
        pdo \
        pdo_mysql \
        zip \
        opcache


COPY --from=composer:2 /usr/bin/composer /usr/bin/composer


WORKDIR /var/www

COPY . .


RUN composer install --optimize-autoloader --no-dev


RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000
CMD ["php-fpm"]
