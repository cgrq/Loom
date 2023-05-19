from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, ProductImages
from app.forms import ProductDetailsForm, ProductImagesForm


product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def get_products():
    """
    Query for all products and returns them as a list of product dictionaries
    """
    products = Storefront.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/<int:id>/images/create', methods=['POST'])
@login_required
def create_product_images(id):
    """
    Creates a new product images by product id
    """
    form = ProductImagesForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product_images = ProductImages(
            image1=form.data['image1'],
            image2=form.data['image2'],
            image3=form.data['image3'],
            image4=form.data['image4'],
            image5=form.data['image5'],
            image6=form.data['image6'],
            product_id=form.data['productId'],
        )
        db.session.add(product_images)
        db.session.commit()

        return {"productImages": product_images.to_dict()}
    return {'errors': form.errors}, 401

@product_routes.route('/<int:id>')
def get_product_by_id(id):
    """
    Query for a product by id and returns the product as a dictionary
    """
    product = product.query.get(id)

    return {"product":product.to_dict()}

@product_routes.route('/storefront/<int:id>')
def get_storefront_products(id):
    """
    Query for a product by storefront id and returns the product as a dictionary
    """
    products = Product.query.filter(Product.storefront_id == id)

    if products is None:
        return {"products": None}

    for product in products:
        print("~~PRODUCT~~", product.to_dict())

    return {"products":[product.to_dict() for product in products]}

@product_routes.route('/create', methods=['POST'])
@login_required
def create_product():
    """
    Creates a new product
    """
    form = ProductDetailsForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product = Product(
            name=form.data['name'],
            description=form.data['description'],
            quantity=form.data['quantity'],
            price=form.data['price'],
            category=form.data['category'],
            subcategory=form.data['subcategory'],
            storefront_id=form.data['storefrontId'],
        )
        db.session.add(product)
        db.session.commit()

        return {"product": product.to_dict()}
    return {'errors': form.errors}, 401

@product_routes.route('/edit', methods=['PUT'])
@login_required
def edit_product():
    """
    Edits a product
    """
    form = StorefrontForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Storefront.query.filter(Storefront.user_id == current_user.id).first()

        product.description = form.data['description']
        product.banner_image = form.data['bannerImage']

        db.session.commit()

        return {"product": product.to_dict()}
    return {'errors': form.errors}, 401

@product_routes.route('/delete', methods=['DELETE'])
def delete_product():
    """
    Route to delete a product
    """
    product = Storefront.query.filter(Storefront.user_id == current_user.id).first()

    db.session.delete(product)
    db.session.commit()

    return {"message":"Delete successful"}
