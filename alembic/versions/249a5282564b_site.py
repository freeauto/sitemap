"""Site

Revision ID: 249a5282564b
Revises: None
Create Date: 2016-09-22 13:10:44.659377

"""

# revision identifiers, used by Alembic.
revision = '249a5282564b'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Site',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('key', sa.Integer(), nullable=False),
    sa.Column('domain', sa.Text(), nullable=True),
    sa.Column('scraping', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('key')
    )
    op.create_index(op.f('ix_Site_domain'), 'Site', ['domain'], unique=False)
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_Site_domain'), table_name='Site')
    op.drop_table('Site')
    ### end Alembic commands ###
