#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
dir=$(basename "$DIR")

(cd .. && node "$dir/server.js" "$dir")
