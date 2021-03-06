import gevent.monkey # @NoMove
gevent.monkey.patch_all() # THIS FIRST: http://stackoverflow.com/questions/8774958/keyerror-in-module-threading-after-a-successful-py-test-run

from com.app_utils import make_main_app
from com.redis_relay import RedisRelay
import settings

app = make_main_app(settings)

relay = RedisRelay(app)

redis = relay.redis

def load_app():
    from com.modules import load_all
    map(load_all, ['assets',
                   'front',
                   'back'])
