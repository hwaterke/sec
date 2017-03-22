#!/usr/bin/env bash
set -e

echo "Updating docker dependencies"
docker pull ruby:alpine

echo "Building docker image"
docker build -t hwaterke/sec -f Dockerfile-prod .

echo "To push to docker, execute:"
echo "  docker login"
echo "  docker push hwaterke/sec"
