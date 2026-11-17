#!/usr/bin/env bash
# usage: next.sh <run-id> <chain-dir> <commit> [agents-line]
# Fresh copy of <commit> from the chain repo (new git history, 1 commit), fresh Codex session, next task.
set -uo pipefail
ID=$1; SRC=$2; REF=$3; LINE=${4:-}
S=$SPIKE; D=/tmp/p2-$ID
rm -rf $D; mkdir -p $D; git -C $SRC archive $REF | tar -x -C $D
if [ -n "$LINE" ]; then cp $S/prompts/AGENTS_line.md $D/AGENTS.md; fi
(cd $D && git init -q && git add -A && git -c user.name=dev -c user.email=dev@local commit -qm "Harbor Desk")
cp -al $NODE_MODULES $D/node_modules
$S/bin/run.sh $ID $D $S/prompts/${P2_TASK:-N_next_task_unread.txt}
(cd $D && git add -A && git diff --cached HEAD) > $S/raw/$ID/step.diff
(cd $D && npm run --silent verify > $S/raw/$ID/post-verify.txt 2>&1; echo "verify_exit=$?" >> $S/raw/$ID/post-verify.txt) 2>/dev/null
grep -q '"verify"' $D/package.json || echo "no verify script" >> $S/raw/$ID/post-verify.txt
