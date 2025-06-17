#!/usr/bin/env bash
# Flatten nested kokoro-kagami directory into project root
set -e
TARGET_DIR="$(dirname "$0")/.."
NESTED="$TARGET_DIR/kokoro-kagami"
if [ ! -d "$NESTED" ]; then
  echo "No nested directory found: $NESTED"
  exit 0
fi
shopt -s dotglob 2>/dev/null
for item in "$NESTED"/*; do
  name="$(basename "$item")"
  case "$name" in
    .|..|.git|.gitmodules|.DS_Store)
      continue
      ;;
  esac
  if [ -e "$TARGET_DIR/$name" ]; then
    echo "Skipping existing $name"
    continue
  fi
  mv "$item" "$TARGET_DIR/"
done
shopt -u dotglob 2>/dev/null
rmdir "$NESTED" 2>/dev/null || true
