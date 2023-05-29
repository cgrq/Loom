from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, ProductImages
from app.forms import ProductDetailsForm, ProductImagesForm
from app.api.aws_helper_routes import upload_file_to_s3, get_uniquefilename, delete_image


product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def get_products():
    """
    Query for all products and returns them as a list of product dictionaries
    """
    products = Product.query.all()
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
        product = Product.query.get(id)

        uploaded_images = []
        for i in range(1, 7):
            file = request.files.get(f"image{i}")
            if file:
                filename = get_uniquefilename(file.filename)
                ext = filename.rsplit(".", 1)[1].lower()

                if ext in {"png", "jpg", "jpeg", "gif"}:
                    upload_result = upload_file_to_s3(file, filename)

                    if "errors" in upload_result:
                        return {'errors': upload_result['errors']}, 400

                    uploaded_images.append(upload_result['url'])
                else:
                    uploaded_images.append(None)
            else:
                break

        product_images = ProductImages(
            image1=uploaded_images[0] if len(uploaded_images) >= 1 else None,
            image2=uploaded_images[1] if len(uploaded_images) >= 2 else None,
            image3=uploaded_images[2] if len(uploaded_images) >= 3 else None,
            image4=uploaded_images[3] if len(uploaded_images) >= 4 else None,
            image5=uploaded_images[4] if len(uploaded_images) >= 5 else None,
            image6=uploaded_images[5] if len(uploaded_images) >= 6 else None,
            product_id=form.data['productId'],
        )

        db.session.add(product_images)
        db.session.commit()

        return {"productImages": product_images.to_dict(), "productSubcategory": product.subcategory}
    return {'errors': form.errors}, 401

@product_routes.route('/<int:id>/images/edit', methods=['PUT'])
@login_required
def edit_product_images(id):
    """
    Edit a product's images by product id
    """
    form = ProductImagesForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product_images = ProductImages.query.filter(ProductImages.product_id == id).first()
        if not product_images:
            return {'errors': 'Product images not found'}, 404

        uploaded_images = []
        for i in range(1, 7):
            file = request.files.get(f"image{i}")
            if file:
                filename = get_uniquefilename(file.filename)
                ext = filename.rsplit(".", 1)[1].lower()

                if ext in {"png", "jpg", "jpeg", "gif"}:
                    upload_result = upload_file_to_s3(file, filename)

                    if "errors" in upload_result:
                        return {'errors': upload_result['errors']}, 400

                    uploaded_images.append(upload_result['url'])
                else:
                    uploaded_images.append(None)
            else:
                uploaded_images.append(None)

        # Delete and update images one by one
        for i in range(1, 7):
            if uploaded_images[i-1] and getattr(product_images, f'image{i}'):
                delete_image(getattr(product_images, f'image{i}'))

        product_images.image1 = uploaded_images[0]
        product_images.image2 = uploaded_images[1]
        product_images.image3 = uploaded_images[2]
        product_images.image4 = uploaded_images[3]
        product_images.image5 = uploaded_images[4]
        product_images.image6 = uploaded_images[5]

        db.session.commit()

        return {"productImages": product_images.to_dict()}
    return {'errors': form.errors}, 401

@product_routes.route('/<string:name>')
def get_product_by_name(name):
    """
    Query for a product by name and returns the product as a dictionary
    """
    product = Product.query.filter(Product.name == name).first()

    if product:
        return {"product": product.to_dict()}
    else:
        return {"error": "Product not found"}, 404

@product_routes.route('/storefront/<int:id>')
def get_storefront_products(id):
    """
    Query for a product by storefront id and returns the product as a dictionary
    """
    products = Product.query.filter(Product.storefront_id == id)

    if products is None:
        return {"products": None}


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

@product_routes.route('<int:id>/edit', methods=['PUT'])
@login_required
def edit_product(id):
    """
    Edits a product
    """
    form = ProductDetailsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product.query.get(id)

        product.name=form.data['name']
        product.description=form.data['description']
        product.quantity=form.data['quantity']
        product.price=form.data['price']
        product.category=form.data['category']
        product.subcategory=form.data['subcategory']
        product.storefront_id=form.data['storefrontId']

        db.session.commit()

        return {"product": product.to_dict()}
    return {'errors': form.errors}, 401

@product_routes.route('<int:id>/delete', methods=['DELETE'])
def delete_product(id):
    """
    Route to delete a product
    """
    product = Product.query.get(id)

    db.session.delete(product)
    db.session.commit()

    return {"message":"Delete successful"}
