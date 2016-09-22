from sqlalchemy.orm import relationship, backref

from com.db.mixins import MixinTime, MixinKeyValue
from database import Model
import sqlalchemy as sa
from sqlalchemy_utils import JSONType

class Site(Model, MixinTime):
    key = sa.Column(sa.Integer, primary_key=True)
    domain = sa.Column(sa.Text, index=True)
    url = sa.Column(sa.Text) # starting url
    progress = sa.Column(sa.Text, default='Scraping...')
    num_pages = sa.Column(sa.Integer)


class Page(Model, MixinTime):
    key = sa.Column(sa.Integer, primary_key=True)
    url = sa.Column(sa.Text, index=True) # starting url
    data = sa.Column(JSONType)

    site_key = sa.Column(sa.Integer, sa.ForeignKey(Site.key))
    site = relationship(Site, backref=backref('pages'))
