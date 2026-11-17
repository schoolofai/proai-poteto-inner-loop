#!/usr/bin/env bash
# usage: chain.sh <n> : session 1 = new Compact button -> operator correction (same session) -> $correct (same session)
set -uo pipefail
N=$1; S=$SPIKE; D=/tmp/p2-c$N
$S/bin/mkcopy.sh $D run-base-slop
export P2_CH=$(mktemp -d $TMPDIR/chain-XXXX)
snap(){ (cd $D && git add -A && git -c user.name=dev -c user.email=dev@local commit -qm "$1" --allow-empty && git rev-parse HEAD) > $S/raw/c$N-$2/commit.txt; (cd $D && git diff HEAD~1 HEAD) > $S/raw/c$N-$2/step.diff; }
$S/bin/run.sh c$N-1-task $D $S/prompts/S1_task_compact.txt; snap "session 1: agent adds Compact button" 1-task
SID=$(grep -m1 thread.started $S/raw/c$N-1-task/codex.jsonl | python3 -c 'import sys,json;print(json.loads(sys.stdin.read())["thread_id"])')
echo $SID > $S/raw/c$N-1-task/session.txt
if ! grep -q -E "^\+.*(deferVisualClass|setTimeout|requestAnimationFrame)" $S/raw/c$N-1-task/step.diff; then echo "no mistake in session 1: chain stops (nothing to correct)" > $S/raw/c$N-done; exit 0; fi
$S/bin/run.sh c$N-2-correction $D $S/prompts/S2_correction.txt $SID; snap "session 1: after operator correction" 2-correction
$S/bin/run.sh c$N-3-correct $D $S/prompts/C3_correct.txt $SID; snap "session 1: after \$correct" 3-correct
echo done > $S/raw/c$N-done
