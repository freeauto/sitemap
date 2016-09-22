"""Site.progress

Revision ID: 4e0d604bdcc0
Revises: 249a5282564b
Create Date: 2016-09-22 13:57:10.656350

"""

# revision identifiers, used by Alembic.
revision = '4e0d604bdcc0'
down_revision = '249a5282564b'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Site', sa.Column('progress', sa.Text(), nullable=True))
    op.drop_column('Site', 'scraping')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Site', sa.Column('scraping', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.drop_column('Site', 'progress')
    ### end Alembic commands ###