from flask import Flask
from flask_cors import CORS
from database.db import initialize_db, migrate_db
from flask_login import LoginManager
from config import Config
import settings

app = Flask(__name__)
CORS(app)
login = LoginManager(app)

app.config.from_object(Config)
# app.config.from_object(os.environ['APP_SETTINGS'])

db = initialize_db(app)
migrate = migrate_db(app, db)

from app import routes

if __name__ == "__main__":
    app.run(debug=True)