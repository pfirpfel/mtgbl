#!/bin/sh

touch .env

if env | grep -q ^OPENSHIFT_REPO_DIR=
then
  HOME=$OPENSHIFT_REPO_DIR node node_modules/bower/bin/bower install
else
  node node_modules/bower/bin/bower install
fi
