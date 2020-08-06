from app import app
from flask import Flask, request, Response, render_template, flash, redirect, url_for
from database.models import Product, User, RigList
from mongoengine.queryset.visitor import Q
from app.forms import LoginForm, RegistrationForm
from mongoengine.errors import NotUniqueError
from mongoengine import DoesNotExist
from flask_login import logout_user, current_user, login_user


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
"""
body = request.get_json()
    print(body)
    try:
        product = Product(**body).save()
    except NotUniqueError as e:
        raise Exception(e)
    
    id = product.id
    return {'id': str(id)}, 200
    """
# USER AUTHENTICATION
@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        user.save()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        try:
            user = User.objects.get(username=form.username.data)
        except DoesNotExist:
            flash('Invalid username or password')
            return redirect(url_for('login'))
        
        if not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for('index'))
    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

# PRODUCT API
@app.route('/products')
def get_products():
    products = Product.objects().to_json()
    return Response(products, mimetype="application/json", status=200), render_template('products.html')

@app.route('/products/<id>', methods=['GET'])
def get_product(id):
    product = Product.objects.get(id=id).to_json()
    print(product)
    return Response(product, mimetype="application/json", status=200)

@app.route('/products/instrument/<id>', methods=['GET'])
def get_group(id):
    group = Product.objects(instrument=id).to_json()
    return Response(group, mimetype="application/json", status=200)
"""
@app.route('/products/instrument/<id>/search', methods=['GET'])
def get_group_from_query(id):
    query = request.args.get('q')
    product = Product.objects(Q(name__icontains=query) & Q(instrument=id)).to_json()
    return Response(product, mimetype="application/json", status=200)
"""

@app.route('/products/search', methods=['GET'])
def get_products_from_query():
    number_per_page = 20
    page = int(request.args.get('page'))
    index = number_per_page * page
    previous_index = index - number_per_page

    query = request.args.get('q')
    categories = request.args.get('categories')

    if categories == "all":
        print(categories)
        product = Product.objects(name__icontains=query)[previous_index:index].to_json()
    else:
        product = Product.objects(Q(name__icontains=query) & Q(instrument=categories))[previous_index:index].to_json()
    
    
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