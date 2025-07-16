#!/bin/bash
#
# Feel free to adjust the on-host volume or port number as you need

docker run \
    --detach \
    -v "$(pwd):/project" \
    -p 8090:80 \
    --name symfony-sandbox-container \
    -it symfony-sandbox
