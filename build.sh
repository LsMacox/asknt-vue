#!/bin/bash

set -a

# Create .env file if don`t exist
FILE_ENV='.env'
if [ ! -f "$FILE_ENV" ]; then
    cp .env.example .env
fi

# Export all variables of .env file
export $(cat .env | grep -v '#' | awk '/=/ {print $1}')

if [ -z "$BUILD_GIT_BRANCH" ]; then BUILD_GIT_BRANCH='main'; fi

# Pull the latest changes from the git repository
# git reset --hard
# git clean -df
# git fetch origin ${BUILD_GIT_BRANCH}
# git reset --hard origin/${BUILD_GIT_BRANCH}
git pull origin $BUILD_GIT_BRANCH

yarn add node-sass
yarn install

NODE_OPTIONS=--max_old_space_size=4096 yarn run build

DIR_BACKEND='../asknt-laravel-back-hpace'
if [ -d "$DIR_BACKEND" ]; then
  cp -r ./dist/* "$DIR_BACKEND"'/public/'
fi

