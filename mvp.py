#!/usr/bin/env python

from main import app, load_app # @NoMove

import logging

from gevent.pywsgi import WSGIServer
from werkzeug.debug import DebuggedApplication

from assets import env
from com.bin.run_server import run_server, QuietWSGIHandler
from manage import manager
import settings


load_app()

def run_server_func():
    # BackdoorServer(('127.0.0.1', settings.BACKDOOR_PORT), locals=get_locals()).start() # get_locals from manage.py
    WSGIServer(('0.0.0.0', settings.LOCALDEV_PORT),
               DebuggedApplication(app, evalex=True),
               handler_class=QuietWSGIHandler).start()
    logging.info("********* Server started: port=%s IS_LIKE_PROD=%s",
                 settings.LOCALDEV_PORT, settings.IS_LIKE_PROD)
    env.watch_asset_changes()


if __name__ == '__main__':
    run_server(run_server_func, manager)
