"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Family, FamilyMember
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@api.route('/signup', methods=['POST'])
def signup():

    request_data = request.get_json(force=True)
    email = request_data['email']
    password = request_data['password']
    first_name = request_data['first_name']
    last_name = request_data['last_name']
    age = request_data['age']
    address_1 = request_data['address_1']
    address_2 = request_data['address_2']
    contact = request_data['contact']

    new_user = User(
        email=email,
        password=password,
        first_name=first_name, 
        last_name=last_name, 
        age=age, 
        address_1=address_1, 
        address_2=address_2, 
        contact=contact,
        is_active=True
        )

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    request_data = request.get_json(force=True)
    email = request_data['email']
    password = request_data['password']

    user = User.query.filter_by(email=email).first()

    if user and user.password == password:
        access_token = create_access_token(identity=user.id, fresh=True)
        return jsonify({"access_token": access_token}), 200

    return jsonify({"message": "Invalid credentials!"}), 401

@api.route('/user_login', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).first()
    return jsonify(user.serialize()), 200

@api.route('/families', methods=['GET','POST'])
def get_families():
    if request.method == 'GET':
        families = Family.query.all()
        return jsonify([i.serialize() for i in families]), 200

    elif request.method == 'POST':
        request_data = request.get_json(force=True)
        family_last_name = request_data['last_name']
        new_family = Family(
            last_name=family_last_name
            )
        db.session.add(new_family)
        db.session.commit()
        return jsonify(new_family.serialize()), 201


@api.route('/families/<int:family_id>', methods=['GET','PUT','DELETE'])
def get_family(family_id):
    if request.method == 'GET':
        family = Family.query.get(family_id)
        return jsonify(family.serialize()), 200

    elif request.method == 'PUT':
        request_data = request.get_json(force=True)
        family_last_name = request_data['last_name']
        family = Family.query.filter_by(last_name=family_last_name).first()
        if family:
            family.family_id = family_id
            db.session.commit()
            return jsonify(family.serialize()), 200
        else:
            new_family = Family(
                last_name=family_last_name,
                )
            db.session.add(new_family)
            db.session.commit()
            return jsonify(new_family.serialize()), 201


    elif request.method == 'DELETE':
        family = Family.query.get(family_id)
        db.session.delete(family)
        db.session.commit()
        return jsonify(family.serialize()), 200

@api.route('/families/<string:last_name>/members', methods=['GET','POST'])
@jwt_required()
def get_members(last_name):
    if request.method == 'GET':
        family = Family.query.filter_by(last_name=last_name).first()
        members = family.members 
        return jsonify([i.serialize() for i in members]), 200

    elif request.method == 'POST':
        request_data = request.get_json(force=True)
        member_first_name = request_data['first_name']
        member_last_name = request_data['last_name']
        member_birth_day = request_data['birth_day']
        member_lucky_number = request_data['lucky_number']
        new_member = FamilyMember(
            first_name=member_first_name,
            last_name=member_last_name,
            birth_day=member_birth_day,
            lucky_number=member_lucky_number,
            creation_date=datetime.now()
            )
        db.session.add(new_member)
        db.session.commit()

        return jsonify(new_member.serialize()), 201

@api.route('/families/all/members', methods=['GET'])
@jwt_required()
def get_all_members():
    if request.method == 'GET':
        members = FamilyMember.query.all()
        return jsonify([i.serialize() for i in members]), 200
