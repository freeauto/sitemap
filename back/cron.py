from com.cron_utils import loop_task
from com.scrape import get_http
from database import db
import settings
from main import app


if not settings.IS_LIKE_PROD: # on localdev, run cron in the same process; but on Heroku, we don't run cron within "gunicorn workers", because there are multiple workers
    import os
    os.environ['RUN_CRON'] = '1'


def on_done():
    db.close()


@loop_task(on_done, 10)
def keep_alive():
    get_http(app.config['ROOT_URL_WITH_SLASH'] + '?who=me')
