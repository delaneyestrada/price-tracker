from .db import db
from werkzeug.security import generate_password_hash, check_password_hash

class Product(db.Document):
    name = db.StringField(required=True, unique=True)
    instrument = db.StringField(required=True)
    image_url = db.StringField(required=True)
    url = db.StringField(required=True, unique=True)
    price = db.StringField(required=True)
    stores_available = db.StringField()

class RigList(db.Document):
    name = db.StringField(required=True)
    products = db.ListField(db.ReferenceField(Product))

class User(db.Document):
    name = db.StringField(required=True)
    email = db.EmailField(required=True)
    password = db.StringField(required=True)
    riglists = db.ListField(db.ReferenceField(RigList))

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
