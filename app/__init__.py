from flask import Flask
from flask_cors import CORS
from database.db import initialize_db
from flask_login import LoginManager
from config import Config

app = Flask(__name__)
CORS(app)
login = LoginManager(app)

app.config.from_object(Config)
app.config['MONGODB_SETTINGS'] = {
    'db': 'price-tracker',
    'host': 'mongodb://localhost/price-tracker'
}

initialize_db(app)

from app import routes

if __name__ == "__main__":
    app.run(debug=True)