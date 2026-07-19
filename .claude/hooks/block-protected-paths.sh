#!/usr/bin/env bash
# PreToolUse (Write|Edit): deny writes to protected paths.
# Blocks wp-config.php, wp-settings.php, and any production or live path.
# Exit 2 denies the tool call. No hardcoded machine paths; matches by suffix.
input="$(cat)"
path="$(printf '%s' "$input" | grep -oE '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed -E 's/.*"file_path"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/')"

case "$path" in
  *wp-config.php|*wp-settings.php|*/production/*|*/live/*|*/prod/*)
    echo "Blocked: $path is a protected path and must not be edited by the agent." >&2
    exit 2
    ;;
esac
exit 0
