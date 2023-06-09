from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm, SignUpForm, EditUserForm
from flask_login import current_user, login_user, logout_user
from app.api.aws_helper_routes import upload_file_to_s3, delete_image, get_uniquefilename

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('')
def authenticate():
    """
    Authenticates a user.
    """

    if current_user.is_authenticated:
        return {"user": current_user.to_dict()}
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)

        return {"user": user.to_dict()}

    return {'errors': form.errors}, 401

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        profile_image = request.files.get('profileImage')
        if profile_image:
            filename = get_uniquefilename(profile_image.filename)
            profile_image_url = upload_file_to_s3(profile_image, filename)['url']
        else:
            profile_image_url = None

        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['firstName'],
            last_name=form.data['lastName'],
            profile_image=profile_image_url
        )
        db.session.add(user)
        db.session.commit()


        login_user(user)
        return {"user": user.to_dict()}
    return {'errors': form.errors}, 401

@auth_routes.route('/edit', methods=['PUT'])
def edit():
    """
    Edits an existing user's information
    """
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(current_user.id)

        profile_image = request.files.get('bannerImage')
        if profile_image:
            filename = get_uniquefilename(profile_image.filename)
            profile_image_url = upload_file_to_s3(profile_image, filename)['url']
            if user.profile_image:
                delete_image(user.profile_image)
            user.profile_image = profile_image_url
        else:
            if user.profile_image:
                delete_image(user.profile_image)
            user.profile_image = None


        user.username = form.data['username']
        user.email = form.data['email']
        user.password = form.data['password']
        user.first_name = form.data['firstName']
        user.last_name = form.data['lastName']

        db.session.commit()

        return {"user": user.to_dict()}
    return {'errors': form.errors}, 401

@auth_routes.route('/delete', methods=['DELETE'])
def delete_team():
    """
    Route to delete a user
    """
    user = User.query.get(current_user.id)
    db.session.delete(user)
    db.session.commit()

    return {"message":"Delete successful"}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
