from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app import login

riglist_products = db.Table('riglist_products',
    db.Column('riglist_id', db.Integer, db.ForeignKey('riglists.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True)
)
match_products = db.Table('match_products',
    db.Column('match_id', db.Integer, db.ForeignKey('matches.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True)
)

class Match(db.Model):
    __tablename__ = 'matches'
    id = db.Column(db.Integer, primary_key=True)
    master_string = db.Column(db.String(200))
    products = db.relationship('Product', secondary=match_products, backref=db.backref("matches"))

class Product(db.Model):
    __tablename__ = 'products'
    __table_args__ = (db.UniqueConstraint('name', 'retailer', name='_name_retailer_uc'),)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), index=True)
    instrument = db.Column(db.String(64), index=True)
    image_url = db.Column(db.String(400))
    url = db.Column(db.String(400), unique=True)
    price = db.Column(db.String(64), nullable=False)
    retailer = db.Column(db.String(64))

class RigList(db.Model):
    __tablename__ = 'riglists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), index=True)
    products = db.relationship('Product', secondary=riglist_products, lazy='select', backref=db.backref("riglists", lazy=True))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))
    riglists = db.relationship('RigList', backref="users")

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

@login.user_loader
def load_user(id):
    return User.query.filter_by(id=id).first()