
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
from flask_cors import CORS  # Import the CORS module

api = Blueprint('api', __name__)

# Enable CORS for all routes
CORS(api)


# @api.route('/hello', methods=['POST', 'GET'])
# @jwt_required()
# def handle_hello():

#     email = get_jwt_identity()
#     dictionary = {
#         "message": "Hello! I'm a message that came from the backend" + email
#     }
#     return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def sign_up():
   email = request.json.get("email",None)
   password = request.json.get("password", None)
   is_active = request.json.get("is_active", None)
       
   user = User(email = email, password = password, is_active = is_active)
   json= request.get_json()

   db.session.add(user)
   db.session.commit()
       
   return jsonify([]), 200

    
@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    users = list(map (lambda user: user.serialize(), users))
    
    return jsonify(users), 200

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
   
    if email != "test" or password!= "test":         
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity = email)
    return jsonify(access_token=access_token)

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():

   email = get_jwt_identity() 
   dictionary={
    "message": "hello world: "+email
   }
   return jsonify(dictionary)

# @api.route("/protected", methods=["GET"])
# @jwt_required()
# def protected():
    
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)
    
#     return jsonify({"id": user.id, "email": user.email }), 200