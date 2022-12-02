"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import jsonify, Blueprint, request
from flask_jwt_extended import create_access_token, jwt_required, current_user
from postgres.main import get_db_connection
from dbmodel.user import User
from recommendations.recommendation_system import RecommendationSystem
import dbmodel.language as Languages
import dbmodel.teacher as Teacher
import dbmodel.learning as Learning

api = Blueprint('api', __name__)


@api.route("/", methods=["GET", "POST"])
def get_home():
    return jsonify({"movies": "ABCS"}), 200


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id \
                FROM user_login_data \
                WHERE email_id='{}' and password_hash='{}';".format(email, password))
    user_data = cur.fetchall()
    cur.close()
    conn.close()
    if len(user_data) == 0:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user_data[0][0])
    resp = jsonify(access_token=access_token)
    return resp, 200


@api.route("/get_user", methods=["GET"])
@jwt_required()
def get_user():
    try:
        user = User()
        user_data = user.get_user_data(current_user['data'])
        return jsonify(
            email=user_data['email'],
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            gender=user_data['gender'],
            date_of_birth=user_data['date_of_birth'],
            role=user_data['role'],
            preferred_lang1=user_data['preferred_lang1'],
            preferred_lang2=user_data['preferred_lang2'],
            preferred_lang3=user_data['preferred_lang3'],
            state=user_data['state'],
            city=user_data['city'],
            locality=user_data['locality'],
            postal_code=user_data['postal_code']
        ), 200
    except Exception as e:
        return jsonify(
            res="User not authenticated"
        ), 401


@api.route("/get_learning_stats", methods=["GET"])
@jwt_required()
def get_learning_stats():
    try:
        user_id = current_user['data']
        learning_stats = Learning.get_learning_stats(user_id)
        return jsonify(
            learning_stats=learning_stats
        ), 200
    except Exception as e:
        print(str(e))
        return jsonify(
            res="User not authenticated"
        ), 401


@api.route("/get_teacher_data", methods=["GET"])
@jwt_required()
def get_teacher_data():
    try:
        args = request.args
        teacher_id = args['teacher_id']
        skill_id = args['skill_id']
        user = User()
        teacher_data = user.get_teacher_details(teacher_id, skill_id)
        return jsonify(
            teacher_data=teacher_data
        ), 200
    except Exception as e:
        return jsonify(
            res="User not authenticated"
        ), 401


@api.route("/get_nearby_teachers", methods=["GET"])
@jwt_required()
def get_nearby_teachers():
    try:
        args = request.args
        skill = args['skill']
        user_id = current_user['data']
        nearby_teachers = Teacher.get_nearby_teachers(user_id, skill)
        return jsonify(
            nearby_teachers=nearby_teachers
        ), 200
    except Exception as e:
        print(str(e))
        return jsonify(
            res="User not authenticated"
        ), 401


@api.route("/recommended_teachers", methods=["GET"])
@jwt_required()
def recommended_teachers():
    try:
        args = request.args
        req_skill_id = args['skill_id']
        skill = Teacher.get_skill(req_skill_id)
        teacher_id = args['teacher_id']
        rs = RecommendationSystem()
        sim_skills = rs.recommend_skills(skill)
        sm_teachers = rs.recommend_teacher(int(teacher_id), sim_skills, skill)
        lst_sm_teachers = list()
        user = User()
        for i in sm_teachers:
            if i != int(teacher_id):
                skill_id = Teacher.get_skill_id(sm_teachers[i])
                teacher_details = user.get_teacher_details(i, skill_id)
                teacher_details['teacher_id'] = i
                teacher_details['skill_id'] = skill_id
                lst_sm_teachers.append(teacher_details)
        return jsonify(
            similar_teachers=lst_sm_teachers
        ), 200
    except Exception as e:
        print(str(e))
        return jsonify(
            res="User not authenticated"
        ), 401


@api.route("/start_learning", methods=["POST"])
@jwt_required()
def start_learning():
    try:
        student_id = current_user['data']
        teacher_id = request.json.get("teacher_id", None)
        skill_id = request.json.get("skill_id", None)
        language_id = request.json.get("language_id", None)
        user_id = Learning.start_learning(student_id, teacher_id, skill_id, language_id)
        if user_id:
            return jsonify(
                res="Learning request submitted successfully"
            ), 200
        return jsonify(
            res="Error occurred while starting learning"
        ), 500
    except Exception as e:
        print(str(e))
        return jsonify(
            res="User not authenticated"
        ), 401


@api.route("/submit_feedback", methods=["POST"])
@jwt_required()
def submit_feedback():
    try:
        learning_id = request.json.get("learning_id", None)
        skill_rating = request.json.get("skill_rating", None)
        lang_rating = request.json.get("lang_rating", None)
        comm_rating = request.json.get("comm_rating", None)
        punct_rating = request.json.get("punct_rating", None)
        comments = request.json.get("comments", None)
        user_id = Learning.submit_feedback(learning_id, skill_rating, lang_rating, comm_rating, punct_rating, comments)
        if user_id:
            return jsonify(
                res="Feedback submitted successfully"
            ), 200
        return jsonify(
            res="Error occurred while starting learning"
        ), 500
    except Exception as e:
        print(str(e))
        return jsonify(
            res="User not authenticated"
        ), 401


@api.route("/my_learnings", methods=["GET"])
@jwt_required()
def my_learnings():
    try:
        user_id = current_user['data']
        past_learnings = Learning.get_past_learnings(user_id)
        return jsonify(
            past_learnings=past_learnings
        ), 200
    except Exception as e:
        print(str(e))
        return jsonify(
            res="User not authenticated"
        ), 401


@api.route("/get_languages", methods=["GET"])
def get_languages():
    try:
        lang_data = Languages.get_languages()
        #print(lang_data)
        return jsonify(
            languages=lang_data
        ), 200
    except Exception as e:
        #print(str(e))
        return jsonify(
            res="Error occurred fetching languages"
        ), 500


@api.route("/create_user", methods=["POST"])
def create_user():
    try:
        user_data = {
            'first_name': request.json.get("first_name", None),
            'last_name': request.json.get("last_name", None),
            'gender': request.json.get("gender", None),
            'email': request.json.get("email", None),
            'password': request.json.get("password", None),
            'date_of_birth': request.json.get("date_of_birth", None),
            'role': request.json.get("role", None)
        }
        print(user_data)
        user = User()
        user_id = user.create_user_main(user_data)
        return jsonify(
            res="User is created successfully!",
            user_id=user_id
        )
    except:
        return jsonify(
            res="Error occurred while creating a user."
        ), 500


@api.route("/update_user_location", methods=["PUT"])
def update_user_location():
    user_location_data = {
        'user_id': request.json.get("user_id", None),
        'latitude': request.json.get("latitude", None),
        'longitude': request.json.get("longitude", None),
        'state': request.json.get("state", None),
        'city': request.json.get("city", None),
        'locality': request.json.get("locality", None),
        'postal_code': request.json.get("postal_code", None)
    }
    user = User()
    user_id = user.update_location(user_location_data)
    if user_id:
        return jsonify(
            res="User's location data updated successfully!",
            user_id=user_id
        )
    return jsonify(
            res="Error occurred while updating location."
        ), 500


@api.route("/update_user_languages", methods=["PUT"])
def update_user_languages():
    user_language_data = {
        'user_id': request.json.get("user_id", None),
        'preferred_lang1': request.json.get("preferred_lang1", None),
        'preferred_lang2': request.json.get("preferred_lang2", None),
        'preferred_lang3': request.json.get("preferred_lang3", None)
    }
    user = User()
    user_id = user.update_languages(user_language_data)
    if user_id:
        return jsonify(
            res="User's language data updated successfully!",
            user_id=user_id
        )
    return jsonify(
            res="Error occurred while creating a user."
        ), 500
