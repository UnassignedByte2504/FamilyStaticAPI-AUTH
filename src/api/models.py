from flask_sqlalchemy import SQLAlchemy
import datetime
import math

from sqlalchemy.orm import relationship


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    age = db.Column(db.Integer)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    contact = db.Column(db.String(120), unique=False,)
    address_1 = db.Column(db.String(120), unique=False,)
    address_2 = db.Column(db.String(120), unique=False,)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "age": self.age,
            "contact": self.contact,
            "address_1": self.address_1,
            "address_2": self.address_2,
            # do not serialize the password, its a security breach
        }
class Family(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String(255), unique=True, nullable=False)
    members = db.relationship('FamilyMember', backref='Family', lazy=True)
    def __repr__(self):
        return f'<Family {self.last_name}>'


    def serialize(self):
        return {
            "id": self.id,
            "last_name": self.last_name,
            "members": [member.serialize() for member in self.members]
        }      


class FamilyMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), unique=False, nullable=False)
    last_name = db.Column(db.String(255), db.ForeignKey('family.last_name'))
    birth_day = db.Column(db.DateTime, nullable=False)
    age = db.Column(db.Integer, nullable=True)
    lucky_number = db.Column(db.Integer, nullable=True)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    def __repr__(self):
        return f'<FamilyMember {self.first_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birth_day": self.birth_day,
            "age": math.floor((datetime.datetime.utcnow() - self.birth_day).days / 365),
            "lucky_number": self.lucky_number,
            "creation_date": self.creation_date
        }
