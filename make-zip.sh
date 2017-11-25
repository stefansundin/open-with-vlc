#!/bin/bash -ex
V=$(cat manifest.json | jq -Mr .version)
rm -f "open-with-vlc-$V.zip"
zip -r "open-with-vlc-$V.zip" . -x '*.git*' -x '*.DS_Store' -x '*Thumbs.db' -x '*.sh' -x '*.zip'
