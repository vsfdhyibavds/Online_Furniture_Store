#!/bin/bash

# Build and deploy script
set -e

echo "Building Docker image..."
docker build -t furniture-store:latest .

echo "Tagging image..."
docker tag furniture-store:latest your-registry/furniture-store:latest

echo "Pushing to registry..."
docker push your-registry/furniture-store:latest

echo "Applying Kubernetes manifests..."
kubectl apply -f kubernetes/

echo "Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/furniture-store -n furniture-store

echo "Deployment completed successfully!"