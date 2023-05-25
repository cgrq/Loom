from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review, User
from app.forms import ProductReviewsForm


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def get_reviews():
    """
    Query for all reviews and returns them as a list of review dictionaries
    """
    reviews = Review.query.all()
    print(reviews)
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/product/<int:productId>')
def get_product_reviews(productId):
    """
    Query for all reviews by product id and return a list of reviews as dictionaries
    """
    reviews = Review.query.filter(Review.product_id == productId).all()

    if not reviews:
        return {"reviews": []}

    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/create', methods=['POST'])
@login_required
def create_review():
    """
    Creates a new review
    """
    form = ProductReviewsForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
            rating=form.data['rating'],
            message=form.data['message'],
            product_id=form.data['productId'],
            user_id=form.data['userId'],
        )
        db.session.add(review)
        db.session.commit()

        print("~~~~~~~~!!!!!! REVIEW")
        print(review.to_dict())

        return {"review": review.to_dict()}
    return {'errors': form.errors}, 401


@review_routes.route('<int:id>/edit', methods=['PUT'])
@login_required
def edit_review(id):
    """
    Edits a review
    """
    form = ProductReviewsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)

        review.rating = form.data['rating']
        review.message = form.data['message']
        review.product_id = form.data['productId']
        review.user_id = form.data['userId']

        db.session.commit()

        return {"review": review.to_dict()}
    return {'errors': form.errors}, 401


@review_routes.route('product/<int:product_id>/delete', methods=['DELETE'])
def delete_review(product_id):
    """
    Route to delete a review
    """
    review = Review.query.filter(Review.product_id == product_id).first()

    db.session.delete(review)
    db.session.commit()

    return {"message": "Delete successful"}
