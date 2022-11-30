from flask import Flask, render_template, request
from flask_jwt_extended import JWTManager
from api.routes import api
from flask_cors import CORS
from postgres.main import get_db_connection
import werkzeug
import os

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = "zdxcsdzhk9o78uhau"
app.config['UPLOAD_FOLDER'] = './profile_pics'
app.register_blueprint(api, url_prefix='/api')


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    print(identity)
    return {'data': identity}


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user


@app.route("/")
def hello_world():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM user_login_data where user_id=5;')
    user_data = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', user_data=user_data)


@app.route('/upload')
def upload_file():
    return render_template('upload.html')


@app.route('/uploader', methods=['GET', 'POST'])
def upload_files():
    if request.method == 'POST':
        f = request.files['profile_pic']
        filename = werkzeug.utils.secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        return 'file uploaded successfully'


if __name__ == '__main__':
    app.run()

