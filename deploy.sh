#!/bin/bash

set -e

rm -rf out || exit 0;
mkdir out

cp index.html out/
cp -R build out


cd out
git init
git config user.name "juancjara"
git config user.email "juanc.jara@pucp.pe"

git add .
git commit -m "deploy gh pages"

git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
