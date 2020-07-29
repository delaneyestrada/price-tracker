from .db import db

class Product(db.Document):
    name = db.StringField(required=True, unique=True)
    image_url = db.StringField(required=True, unique=True)
    url = db.StringField(required=True, unique=True)
    price = db.StringField(required=True)
