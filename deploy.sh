#!/usr/bin/env bash

# requires ipfs to be installed

# echo "Starting IPFS Daemon..."
# ipfs daemon &>/dev/null &&
# IPFS_PID=$!
# echo "done."

FOLDER="./dist"

echo
echo "Adding to IPFS..."
ipfs add -r -q $FOLDER >publish.log || die "Could not add to IPFS"

HASH=$(tail -n1 publish.log)

echo
echo "🎉 Published $FOLDER → $HASH"
echo "    http://localhost:8080/ipfs/$HASH"
echo "    https://ipfs.io/ipfs/$HASH"
echo

# add to versions/history
cat <<EOF >> versions/history
$HASH
EOF

# overwrite versions/current
cat <<EOF > versions/current
$HASH
EOF

# purrrrge
rm publish.log

# use IPNS as ideal case. Need to figure out how to persist
# peer id between different machines or CI builds.
#echo "Update references on IPNS..."
#ipfs name publish "$hash"

# Update DNS provider, would be redundant with above IPNS usage
# echo "Update DNS..."
# curl "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE/" \
#     -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
#     -H "X-Auth-Key: $CLOUDFLARE_KEY" \
#     -H "Content-Type: application/json" \
#     --data ''

# kill IPFS daemon
#kill $IPFS_PID

# echo "done."
# echo

exit
