from app import app
from flask import Flask, request, Response, render_template, flash, redirect, url_for, session
from database.models import Product, User, RigList
from mongoengine.queryset.visitor import Q
from app.forms import LoginForm, RegistrationForm
from mongoengine.errors import NotUniqueError
from mongoengine import DoesNotExist
from flask_login import logout_user, current_user, login_user
import json
from math import ceil


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/products')
def products():
    """
    page_info = {
            'query': request.args.get('q'),
            'categories': request.args.get('categories'),
            'page': request.args.get('page'),
            'num_products': request.args.get('num_products')
    }"""
    """
    if page_info['page']:
        page_info['page'] = int(page_info['page'])
    if page_info['num_products']:
        page_info['num_products'] = int(page_info['num_products'])
    """

    try:
        session['page_info']['page'] = int(request.args.get('page'))
        page_info = session['page_info']
        print(page_info)
        return render_template('products.html', page_info=page_info)
    except (AttributeError, TypeError) as e:
        print("Error")

        page_info = {
            'query': "",
            'categories': "all",
            'page': 1,
            'num_products': 20
        }
        return render_template('products.html', page_info=page_info)

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
@app.route('/products/<id>', methods=['GET'])
def get_product(id):
    product = Product.objects.get(id=id).to_json()
    print(product)
    return Response(product, mimetype="application/json", status=200)

@app.route('/products/instrument/<id>', methods=['GET'])
def get_group(id):
    group = Product.objects(instrument=id).to_json()
    return Response(group, mimetype="application/json", status=200)

@app.route('/products/search', methods=['GET'])
def get_products_from_query():
    number_per_page = 20
    page = int(request.args.get('page'))
    index = number_per_page * page
    previous_index = index - number_per_page

    query = request.args.get('q')
    categories = request.args.get('categories')
    req = request.args.get('req')
    if req == "products":
        if categories == "all":
            product = (Product.objects(name__icontains=query)[previous_index:index].to_json())
            session['num_products'] = len(Product.objects(name__icontains=query))
        else:
            product = (Product.objects(Q(name__icontains=query) & Q(instrument=categories))[previous_index:index].to_json())
            session['num_products'] = len(Product.objects(Q(name__icontains=query) & Q(instrument=categories)))
        return Response(product, mimetype="application/json", status=200)
    elif req == "page_info":
        print(session['num_products'])
        pages = ceil(session['num_products'] / number_per_page)
        page_info = [json.dumps({'number_per_page': number_per_page, 'page': page, 'number_of_pages': pages, 'query': query, 'categories': categories, 'num_products': session['num_products']})]
        session['page_info'] = json.loads(page_info[0])
        return Response(page_info, mimetype="application/json", status=200)
    

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