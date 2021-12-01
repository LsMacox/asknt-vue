#!/bin/bash

set -a

FILE_ENV='.env'
if [ ! -f "$FILE_ENV" ]; then
    cp .env.example .env
fi

if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

if [ -n "$BUILD_GIT_BRANCH" ]; then BUILD_GIT_BRANCH='main'; fi

git fetch origin ${BUILD_GIT_BRANCH}
git reset --hard origin/${BUILD_GIT_BRANCH}

DIR_BACKEND='../asknt-laravel-back-hpace'
DIR_NODEMODULES='node_modules'
if [ -d "$DIR_NODEMODULES" ];
then
    npm update
else
    npm install
fi

npm run build

if [ -d "$DIR_BACKEND" ]; then
  cp -r ./dist/* "$DIR_BACKEND"'/public/'
fi

