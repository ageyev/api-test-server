#!/usr/bin/env bash

# setup repo:
git remote add origin git@github.com:ageyev/api-test-server.git
git branch --set-upstream-to=origin/master master
git push -u origin master