from flask import Flask, request, Response, render_template
from flask_cors import CORS
from database.db import initialize_db
from database.models import Product
from mongoengine.errors import NotUniqueError
from mongoengine.queryset.visitor import Q
from werkzeug.urls import url_parse
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user, login_user, logout_user, login_required
import requests
import os
from config import Config

app = Flask(__name__)
CORS(app)



app.config.from_object(Config)
app.config['MONGODB_SETTINGS'] = {
    'db': 'price-tracker',
    'host': 'mongodb://localhost/price-tracker'
}

initialize_db(app)

from app import routes

if __name__ == "__main__":
    app.run(debug=True)