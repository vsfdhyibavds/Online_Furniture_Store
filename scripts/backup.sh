#!/bin/bash

# Database backup script
set -e

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

echo "Creating backup directory..."
mkdir -p $BACKUP_DIR

echo "Backing up database..."
docker exec furniture-store_postgres_1 pg_dump -U furniture_user furniture_store > $BACKUP_DIR/db_backup_$DATE.sql

echo "Backing up uploads..."
docker cp furniture-store_furniture-store_1:/app/server/uploads $BACKUP_DIR/uploads_$DATE

echo "Compressing backups..."
tar -czf $BACKUP_DIR/furniture_store_backup_$DATE.tar.gz $BACKUP_DIR/db_backup_$DATE.sql $BACKUP_DIR/uploads_$DATE

echo "Cleaning up..."
rm -rf $BACKUP_DIR/db_backup_$DATE.sql $BACKUP_DIR/uploads_$DATE

echo "Backup completed: furniture_store_backup_$DATE.tar.gz"