from flask import Flask
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World!'