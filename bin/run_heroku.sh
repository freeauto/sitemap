#!/usr/bin/env bash

#bash bin/cron.sh &

#bash bin/helper.sh &

gunicorn -k gunicorn.workers.ggevent.GeventWorker mvp:app
