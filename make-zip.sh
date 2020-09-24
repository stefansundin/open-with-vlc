#!/bin/bash -ex
V=$(cat extension/manifest.json | jq -Mr .version)
rm -f "open-with-vlc-$V.zip"
cd extension
zip -r "../open-with-vlc-$V.zip" . -x '*.git*' -x '*.DS_Store' -x '*Thumbs.db'
