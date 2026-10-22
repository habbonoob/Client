#!/usr/bin/env bash
# Logs a seed user of the local Habbo server into the client served on a port, with a fresh SSO ticket, and reports
# the client's errors and what the server logged for the connection. A login alone misses most of the client: pass
# actions (smoke.ts's SMOKE_ACTIONS) to go further, e.g. into the home room, walking and chatting:
#
#   ROOM='[["click",40,680],["wait",9000],["click",632,441],["wait",1500],["click",560,420],["wait",4000],
#          ["click",140,79],["type","hello"],["key","Enter"],["wait",3000]]'
#   SMOKE_ACTIONS="$ROOM" tools/login-test.sh 4174 next 40 admin
#
# Usage: tools/login-test.sh <port> <name> [seconds=45] [seed user=tester]
#   HABBO_REPO   the server checkout (default ~/RiderProjects/Habbo); its src/Habbo.Host/appsettings.json seeds users
#   SERVER_LOG   the running server's log, to show the connection's lines (optional)
# Writes login-<name>.png in the current folder.
PORT=$1
NAME=$2
RUN_SECONDS=${3:-45}
SEED_USER=${4:-tester}
HABBO_REPO=${HABBO_REPO:-$HOME/RiderProjects/Habbo}
HERE=$(pwd)
TICKET=$(mktemp)
trap 'rm -f "$TICKET"' EXIT

(cd "$HABBO_REPO" && python - "$(cygpath -w "$TICKET" 2>/dev/null || echo "$TICKET")" "$SEED_USER" <<'EOF'
import json, os, sys, urllib.request
# the seed users with known passwords live in the Development settings (the base file has none since 2026-10-04)
users = []
for name in ('src/Habbo.Host/appsettings.Development.json', 'src/Habbo.Host/appsettings.json'):
    if os.path.exists(name):
        users += json.load(open(name, encoding='utf-8-sig')).get('Seed', {}).get('Users', [])
user = next(x for x in users if x['Username'] == sys.argv[2])
req = urllib.request.Request('http://localhost:8080/api/auth/login',
                             json.dumps({'username': user['Username'], 'password': user['Password']}).encode(),
                             {'Content-Type': 'application/json'})
open(sys.argv[1], 'w').write(json.load(urllib.request.urlopen(req))['ssoTicket'])
EOF
) || exit 1

LINES=0
[ -n "$SERVER_LOG" ] && LINES=$(wc -l < "$SERVER_LOG")
cd "$(dirname "$0")/.." || exit 1
timeout $((RUN_SECONDS + 60)) node tools/smoke.ts "http://localhost:$PORT/?server=dev&ticket=$(cat "$TICKET")" "$RUN_SECONDS" "$HERE/login-$NAME.png" 2>&1 \
  | grep -iv "ticket" | grep -E "\[error\]|exception|Login Step|Error|stats" | cut -c1-300 | tail -30
if [ -n "$SERVER_LOG" ]; then
  echo "--- server"
  tail -n +$((LINES + 1)) "$SERVER_LOG" | grep -E "Connection|unexpected|counterpart|fail:|authenticated|entered room" | grep -v "^ *at " | cut -c1-250 | head -30
fi
