#!/bin/bash

echo 'Docker HUB CREATE'

IMAGE_PREFIX="whatsappbot:0.0.5"

docker tag whatsappbot thiago723/${IMAGE_PREFIX} \
&& docker push thiago723/${IMAGE_PREFIX} \
&& docker rmi -f thiago723/${IMAGE_PREFIX}

echo 'Imagem Docker enviada com sucesso para Docker Hub'