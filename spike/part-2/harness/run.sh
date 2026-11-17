#!/usr/bin/env bash
# usage: run.sh <run-id> <run-dir> <prompt-file> [resume-session-id]
# Fresh throwaway CODEX_HOME (auth.json + config.toml copies only). API keys unset.
set -uo pipefail
ID=$1; DIR=$2; PROMPT=$3; RESUME=${4:-}
OUT=$SPIKE/raw/$ID
mkdir -p "$OUT"
if [ -n "${P2_CH:-}" ]; then CH=$P2_CH; else CH=$(mktemp -d $TMPDIR/ch-XXXX); fi
[ -f "$CH/auth.json" ] || { cp ~/.codex/auth.json ~/.codex/config.toml "$CH/"; printf '\n[projects."%s"]\ntrust_level = "trusted"\n' "$DIR" >> "$CH/config.toml"; }
start=$(date +%s)
if [ -z "$RESUME" ]; then
  env -u OPENAI_API_KEY CODEX_HOME="$CH" \
    codex exec --json -s workspace-write -C "$DIR" -o "$OUT/last-message.md" - < "$PROMPT" > "$OUT/codex.jsonl" 2> "$OUT/stderr.txt"
else
  (cd "$DIR" && env -u OPENAI_API_KEY CODEX_HOME="$CH" \
    codex exec --json -s workspace-write -o "$OUT/last-message.md" resume "$RESUME" - < "$PROMPT" > "$OUT/codex.jsonl" 2> "$OUT/stderr.txt")
fi
rc=$?
echo "exit=$rc seconds=$(( $(date +%s) - start ))" > "$OUT/time.txt"
cp "$PROMPT" "$OUT/prompt.txt"
echo "$CH" > "$OUT/codex_home.txt"
