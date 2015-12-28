#!/bin/bash

echo "deploy"

webpack -p
git checkout gh-pages
git merge master
