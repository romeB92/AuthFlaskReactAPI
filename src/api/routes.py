"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager



api = Blueprint('api', __name__)
# Setup the Flask-JWT-Extended extension



# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route('/login', methods=['POST'])
def handle_login():
    print("body:", request.json)

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({
            "msg": "No account was found. Please check the email used or create an account."
        }), 401
    
    if password != user.password:
        return jsonify({"msg": "Incorrect password. Please try again."}), 401

    access_token = create_access_token(identity=email)
    
    payload = {
        "token": access_token,
        "user": user.serialize(),  # This line is optional.
        'msg': 'Login Successful.',
    }
    return jsonify(payload), 200

# !!--SIGN-UP--!!
@api.route('/signup', methods=['POST'])
def handle_signup():
    print("body:", request.json)

    body = request.json # get the request body content
    email = body.get('email', None)
    name = body.get('name', None)
    password = body.get('password', None)
    
    if body is None:
        return jsonify(msg="The request body is null"), 400
    if not email:
        return jsonify(msg='You need to enter an email'), 400
    if not name:
        return jsonify(msg='You need to enter an name'),400
    if not password:
        return jsonify(msg='You need to enter a password'), 400

    check_user = User.query.filter_by(email=email).first()
    print(check_user)

    if check_user is not None:
        return jsonify({
            'msg': 'The email address already exists. Please login to your account to continue.'
        }), 400

    user = User(email=email, password=password, is_active=True, name=name)

    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=user.email)
    return jsonify({
        'msg': 'User created successfully.',
        'access_token': access_token,
        }), 201



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200