from .db import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app import login

class Product(db.Document):
    name = db.StringField(required=True, unique=True)
    instrument = db.StringField(required=True)
    image_url = db.StringField(required=True)
    url = db.StringField(required=True, unique=True)
    price = db.StringField(required=True)
    stores_available = db.StringField()

class RigList(db.Document):
    name = db.StringField(required=True)
    products = db.ListField(db.ReferenceField('Product'))
    user = db.ReferenceField('User')

class User(UserMixin, db.Document):
    username = db.StringField(required=True, unique=True)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)
    riglists = db.ListField(db.ReferenceField('RigList'))

    def __str__(self):
        return "Username: " + self.username + "\nEmail: " + self.email + "\nPassword: " + self.password

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

@login.user_loader
def load_user(id):
    return User.objects.get(id=id)