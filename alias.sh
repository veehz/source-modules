#!/bin/bash

ROOT=/home/veehz/Desktop/nus/modules/fyp

MODULES=$ROOT/source-modules
FRONTEND=$ROOT/source-frontend

run-frontend() {
    cd $FRONTEND
    yarn run start
    cd $MODULES
}

serve-modules() {
    npx http-server --cors=* -c-1 -p 8022 ./build -c-1
}

build-modules() {
    yarn run build modules
}