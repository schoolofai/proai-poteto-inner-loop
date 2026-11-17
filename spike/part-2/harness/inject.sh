#!/usr/bin/env bash
# usage: inject.sh <label> <chain-dir> <commit> <agents:0|1> <A-run-id> <variant: helper|inline>
set -uo pipefail
L=$1; SRC=$2; REF=$3; AG=$4; AR=$5; V=$6
S=$SPIKE; D=/tmp/p2-inj-$L; OUT=$S/inject/$L.txt
rm -rf $D; mkdir -p $D; git -C $SRC archive $REF | tar -x -C $D
[ "$AG" = 1 ] && cp $S/prompts/AGENTS_line.md $D/AGENTS.md
cd $D && git init -q && git add -A && git -c user.name=dev -c user.email=dev@local commit -qm base
cp -al $NODE_MODULES node_modules
git apply $S/raw/$AR/step.diff || { echo "APPLY FAILED" > $OUT; exit 1; }
[ "$V" = inline ] && cp $S/inject/UnreadFilter.inline-timer.tsx src/UnreadFilter.tsx
{ echo "# $L: past mistake from $AR ($V variant) applied to $REF (agents_line=$AG)"
  for c in test typecheck lint build check verify; do
    if grep -q "\"$c\":" package.json; then npm run --silent $c > $D.log 2>&1; rc=$?; echo "## npm run $c -> exit $rc"; grep -i -E "error|fail|✗|×|FAIL|deferVisualClass|classList|Cannot find" $D.log | head -8; fi
  done; } > $OUT 2>&1
cd /; rm -rf $D $D.log
