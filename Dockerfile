FROM debian:12-slim

RUN apt update && \
    apt upgrade -y
RUN apt install -y apache2 libapache2-mod-php8.2 php8.2 php-xml composer

# Symfony 5.4 deps are specifically:
#
# * php-xml
#
# All others are loaded in Debian by default.
#
# To generate this project I used the following:
#
#     composer create-project symfony/skeleton:"5.4.99" /project/symfony

# Here's a bit of Apache config.
# We also have some rules in `public/.htaccess`.
COPY docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf
RUN cd /etc/apache2/mods-enabled && \
    ln -s ../mods-available/rewrite.load .

WORKDIR /project

# We don't copy any src/ or vendor/ folders (etc) into the image, as the intention
# is this Docker project is run using an on-host folder per the options in
# `docker-bin/start.sh`. However, candidates are free to tinker as much as
# they like!

CMD ["apachectl", "-D", "FOREGROUND"]
