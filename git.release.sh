#!/usr/bin/env bash

#git add .
#git commit -a -m "Initial release"
#git tag v0.1.0
#git push origin master --tags

git add .
git commit -a -m "update version"
git tag v0.1.1 # see package.json : "version"
git push origin master --tags
git push --all

