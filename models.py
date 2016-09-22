from sqlalchemy.orm import relationship, backref

from com.db.mixins import MixinTime, MixinKeyValue
from database import Model
import sqlalchemy as sa

class Site(Model, MixinTime):
    key = sa.Column(sa.Text, primary_key=True)

    def __unicode__(self):
        return unicode(self.key)

    @classmethod
    def create(cls, domain):
        return Site(key=domain)

    @classmethod
    def ensure_by_domain(cls, domain):
        return cls.get(key=domain) or cls.create(key=domain)
