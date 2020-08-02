from flask import Flask, request, Response, render_template
from flask_cors import CORS
from database.db import initialize_db
from database.models import Product
from mongoengine.errors import NotUniqueError
import requests

app = Flask(__name__)
CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'db': 'price-tracker',
    'host': 'mongodb://localhost/price-tracker'

}

initialize_db(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/products')
def get_products():
    products = Product.objects().to_json()
    return Response(products, mimetype="application/json", status=200)

@app.route('/products/<id>', methods=['GET'])
def get_product(id):
    product = Product.objects.get(id=id).to_json()
    return Response(product, mimetype="application/json", status=200)

@app.route('/products/instrument/<id>', methods=['GET'])
def get_group(id):
    group = Product.objects(instrument=id).to_json()
    return Response(group, mimetype="application/json", status=200)

@app.route('/products/search', methods=['GET'])
def get_products_from_query():
    query = request.args.get('q')
    product = Product.objects(name__icontains=query).to_json()
    return Response(product, mimetype="application/json", status=200)

@app.route('/products', methods=['POST'])
def add_product():
    body = request.get_json()
    print(body)
    try:
        product = Product(**body).save()
    except NotUniqueError as e:
        raise Exception(e)
    
    id = product.id
    return {'id': str(id)}, 200

@app.route('/products/<id>', methods=['PUT'])
def update_product(id):
    body = request.get_json()
    Product.objects.get(id=id).update(**body)
    return '', 200

@app.route('/products/<id>', methods=['DELETE'])
def delete_product(id):
    Product.objects.get(id=id).delete()
    return '', 200

app.run(debug=True)