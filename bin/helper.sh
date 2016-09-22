#!/usr/bin/env bash

source com/bin/virtual.sh
NODE_PATH=$NODE_PATH:./com/js NODE_ENV=production node com/js/bin/render-server.js
