#!/usr/bin/env bash
# usage: mkcopy.sh <dest> <src-tag-or-commit-in-part2-repo>   -> fresh copy with own git history (1 commit), hardlinked node_modules
set -euo pipefail
DEST=$1; REF=$2
R=$REPO
rm -rf "$DEST"; mkdir -p "$DEST"
git -C "$R" archive "$REF" | tar -x -C "$DEST"
cd "$DEST"; git init -q; git add -A; git -c user.name=dev -c user.email=dev@local commit -qm "Harbor Desk"
cp -al $NODE_MODULES node_modules
