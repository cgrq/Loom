from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Storefront
from app.forms import StorefrontForm


storefront_routes = Blueprint('storefronts', __name__)


@storefront_routes.route('/')
def storefronts():
    """
    Query for all storefronts and returns them as a list of storefront dictionaries
    """
    storefronts = Storefront.query.all()
    return {'storefronts': [storefront.to_dict() for storefront in storefronts]}

@storefront_routes.route('/<int:id>')
def user(id):
    """
    Query for a storefront by id and returns the storefront as a dictionary
    """
    storefront = Storefront.query.get(id)

    return storefront.to_dict()

@storefront_routes.route('/create', methods=['POST'])
@login_required
def create_storefront():
    """
    Creates a new storefront
    """
    form = StorefrontForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        storefront = Storefront(
            description=form.data['description'],
            banner_image=form.data['bannerImage']
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

        user.description = form.data['description']
        user.banner_image = form.data['banner_image']

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
