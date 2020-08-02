from .db import db

class Product(db.Document):
    name = db.StringField(required=True, unique=True)
    instrument = db.StringField(required=True)
    image_url = db.StringField(required=True)
    url = db.StringField(required=True, unique=True)
    price = db.StringField(required=True)
