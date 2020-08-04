from app import app
from flask import Flask, request, Response, render_template
from database.models import Product
from mongoengine.queryset.visitor import Q
from app.forms import LoginForm

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    form = LoginForm()
    return render_template('login.html', title='Sign In', form=form)

@app.route('/products')
def get_products():
    products = Product.objects().to_json()
    return Response(products, mimetype="application/json", status=200)

@app.route('/products/<id>', methods=['GET'])
def get_product(id):
    product = Product.objects.get(id=id).to_json()
    print(product)
    return Response(product, mimetype="application/json", status=200)

@app.route('/products/instrument/<id>', methods=['GET'])
def get_group(id):
    group = Product.objects(instrument=id).to_json()
    return Response(group, mimetype="application/json", status=200)

@app.route('/products/instrument/<id>/search', methods=['GET'])
def get_group_from_query(id):
    query = request.args.get('q')
    product = Product.objects(Q(name__icontains=query) & Q(instrument=id)).to_json()
    return Response(product, mimetype="application/json", status=200)

@app.route('/products/search', methods=['GET'])
def get_products_from_query():
    query = request.args.get('q')
    product = Product.objects(name__icontains=query).to_json()
    return Response(product, mimetype="application/json", status=200)

@app.route('/product/search', methods=['GET'])
def get_product_from_id():
    query = request.args.get('q')
    product = Product.objects(id=query).to_json()
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