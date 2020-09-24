"""add match model

Revision ID: 0cce490c47c1
Revises: eb1195696f45
Create Date: 2020-09-24 18:11:54.978102

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0cce490c47c1'
down_revision = 'eb1195696f45'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('matches',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('master_string', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('match_products',
    sa.Column('match_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['match_id'], ['matches.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('match_id', 'product_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('match_products')
    op.drop_table('matches')
    # ### end Alembic commands ###