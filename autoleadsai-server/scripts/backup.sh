#!/bin/bash

# ─── Configuration ───────────────────────────────────
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups"
MONGO_URI="${MONGODB_URI:-mongodb://localhost:27017/autoleadsai}"
DATABASE="autoleadsai"

# ─── Create backup directory ─────────────────────────
mkdir -p "$BACKUP_DIR"

# ─── Backup MongoDB ──────────────────────────────────
echo "========================================="
echo "  AutoLeadsAI Database Backup"
echo "  Timestamp: $TIMESTAMP"
echo "========================================="

echo ""
echo "Backing up MongoDB..."

mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/mongodb_$TIMESTAMP"

if [ $? -eq 0 ]; then
    echo "  ✓ MongoDB backup complete"

    # Compress the backup
    tar -czf "$BACKUP_DIR/mongodb_$TIMESTAMP.tar.gz" -C "$BACKUP_DIR" "mongodb_$TIMESTAMP"
    rm -rf "$BACKUP_DIR/mongodb_$TIMESTAMP"

    echo "  ✓ Backup compressed: mongodb_$TIMESTAMP.tar.gz"
else
    echo "  ✗ MongoDB backup failed"
    exit 1
fi

# ─── Backup n8n workflows ────────────────────────────
echo ""
echo "Backing up n8n workflows..."

N8N_DIR="./n8n-data"
if [ -d "$N8N_DIR" ]; then
    tar -czf "$BACKUP_DIR/n8n_$TIMESTAMP.tar.gz" -C . "$N8N_DIR"
    echo "  ✓ n8n backup complete: n8n_$TIMESTAMP.tar.gz"
else
    echo "  ⚠ n8n data directory not found — skipping"
fi

# ─── Cleanup old backups ─────────────────────────────
echo ""
echo "Cleaning backups older than 30 days..."

find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete

echo "  ✓ Old backups cleaned"

# ─── Summary ─────────────────────────────────────────
echo ""
echo "========================================="
echo "  Backup Complete!"
echo "  Location: $BACKUP_DIR"
echo "========================================="
ls -lh "$BACKUP_DIR"/*.tar.gz 2>/dev/null