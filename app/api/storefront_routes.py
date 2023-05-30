from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Storefront
from app.forms import StorefrontForm
from app.api.aws_helper_routes import upload_file_to_s3, delete_image, get_uniquefilename


storefront_routes = Blueprint('storefronts', __name__)

@storefront_routes.route('/user')
def get_user_storefront():
    """
    Query for a storefront by id and returns the storefront as a dictionary
    """
    storefront = Storefront.query.filter(Storefront.user_id == current_user.id).first()

    if storefront is None:
        return {"storefront": None}

    return {"storefront":storefront.to_dict()}


@storefront_routes.route('/create', methods=['POST'])
@login_required
def create_storefront():
    """
    Creates a new storefront
    """
    form = StorefrontForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        banner_image = request.files.get('bannerImage')
        if banner_image:
            filename = get_uniquefilename(banner_image.filename)
            banner_image_url = upload_file_to_s3(banner_image, filename)['url']
        else:
            banner_image_url = None

        storefront = Storefront(
            name=current_user.username,
            description=form.data['description'],
            banner_image=banner_image_url,
            user_id=current_user.id
        )
        db.session.add(storefront)
        db.session.commit()

        return {"storefront": storefront.to_dict()}
    return {'errors': form.errors}, 401

@storefront_routes.route('/edit', methods=['PUT'])
@login_required
def edit_storefront():
    """
    Edits a storefront
    """
    form = StorefrontForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        storefront = Storefront.query.filter(Storefront.user_id == current_user.id).first()

        banner_image = request.files.get('bannerImage')
        if banner_image:
            filename = get_uniquefilename(banner_image.filename)
            banner_image_url = upload_file_to_s3(banner_image, filename)['url']
            if storefront.banner_image:
                delete_image(storefront.banner_image)
            storefront.banner_image = banner_image_url
        else:
            if storefront.banner_image:
                delete_image(storefront.banner_image)
            storefront.banner_image = None

        storefront.description = form.data['description']
        db.session.commit()

        return {"storefront": storefront.to_dict()}
    return {'errors': form.errors}, 401

@storefront_routes.route('/delete', methods=['DELETE'])
def delete_storefront():
    """
    Route to delete a storefront
    """
    storefront = Storefront.query.filter(Storefront.user_id == current_user.id).first()

    db.session.delete(storefront)
    db.session.commit()

    return {"message":"Delete successful"}


@storefront_routes.route('/<string:name>')
def get_storefront_by_name(name):
    """
    Query for a storefront by name and returns the product as a dictionary
    """


    storefront = Storefront.query.filter(Storefront.user_id == current_user.id).first()


    if storefront:
        return {"storefront":storefront.to_dict()}
    else:
        return {"error": "Product not found"}, 404

@storefront_routes.route('/<int:id>')
def get_storefront_by_id(id):
    """
    Query for a storefront by id and returns the storefront as a dictionary
    """
    storefront = Storefront.query.get(id)

    return {"storefront":storefront.to_dict()}

@storefront_routes.route('/')
def get_storefronts():
    """
    Query for all storefronts and returns them as a list of storefront dictionaries
    """


    storefronts = Storefront.query.all()
    return {'storefronts': [storefront.to_dict() for storefront in storefronts]}
