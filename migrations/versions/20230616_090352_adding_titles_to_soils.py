"""adding-titles-to-soils

Revision ID: 76a6b9733664
Revises: 451e47293236
Create Date: 2023-06-16 09:03:52.820596

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '76a6b9733664'
down_revision = '451e47293236'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('soils', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE soils SET SCHEMA {SCHEMA};")



def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('soils', schema=None) as batch_op:
        batch_op.drop_column('title')

    # ### end Alembic commands ###
