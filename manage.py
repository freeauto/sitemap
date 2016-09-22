from main import app # DO FIRST: https://github.com/gevent/gevent/issues/446

from flask_assets import ManageAssets
from flask_script import Manager
import gevent

from assets import env
from front.home import *
import settings


manager = Manager(app)
manage_assets = ManageAssets()
manager.add_command("assets", manage_assets) # To build assets, just do: ./run.sh assets build

@manager.command
def clean():
    env.clean()

@manager.command
def build():
    manage_assets.run(['build'])

# some imports for backdoor (nc localhost 2823) and shell (./run.sh shell)
LOCALS = locals()
def get_locals():
    return LOCALS

@manager.command
def shell():
    import code
    code.interact("\n>>> %s %s shell. Try dir()" % ('PRODUCTION' if settings.IS_LIKE_PROD else 'localdev', app.name), local=get_locals())

@manager.command
def cron():
    import os
    dyno = os.environ.get('DYNO')
    if dyno == 'web.1':
        logging.info('Dyno detected (%s), starting scheduler', dyno)
        os.environ['RUN_CRON'] = '1'
        gevent.wait()
    else:   
        logging.info('Dyno detected (%s), NOT starting scheduler', dyno)


if __name__ == '__main__':
    from main import load_app
    load_app()
    manager.run()
