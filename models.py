from sqlalchemy.orm import relationship, backref

from com.db.mixins import MixinTime, MixinKeyValue
from database import Model
import sqlalchemy as sa

class Site(Model, MixinTime):
    key = sa.Column(sa.Integer, primary_key=True)
    domain = sa.Column(sa.Text, index=True)
    scraping = sa.Column(sa.Boolean, default=True)

    def __unicode__(self):
        return unicode(self.domain)

    @classmethod
    def create(cls, domain):
        return Site(domain=domain)
