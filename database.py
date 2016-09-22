from sqlalchemy import create_engine

from com.db.session import ScopedDatabaseSession
from com.db.model import Model
from main import app
import settings

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

db = ScopedDatabaseSession(engine)

app.teardown_request(db.on_request_teardown)


def get_metadata():
    from com.modules import load_all
    import models
    load_all(models)
    return Model.metadata # @UndefinedVariable


def init_db():
    get_metadata().create_all(bind=engine)

if __name__ == '__main__':
    print ">>> Initializing DB for:", ("PRODUCTION" if settings.IS_LIKE_PROD else "LOCALDEV")
    init_db()
    from alembic import command
    command.stamp(settings.ALEMBIC_CONFIG, "head")
