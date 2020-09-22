from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

def initialize_db(app):
    return SQLAlchemy(app)

def migrate_db(app, db):
    return Migrate(app, db)