from postgres.main import get_db_connection


class User:

    def get_user_data(self, user_id):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("select a.email_id, b.first_name, b.last_name, b.gender, b.date_of_birth,\
                        c.role_name, d.language_name as preferred_lang1,\
                        e.language_name as preferred_lang2, f.language_name as preferred_lang3, \
                        g.state_name, g.city_name, g.locality, g.postal_code \
                    from user_login_data a \
                        inner join user_account b \
                            on a.user_id = b.user_id \
                        inner join user_roles c\
                            on b.role_id = c.row_id \
                        inner join user_location g  \
                            on b.location_id = g.row_id \
                        left join languages d \
                            on b.preferred_lang1_id = d.row_id \
                        left join languages e \
                            on b.preferred_lang2_id = e.row_id \
                        left join languages f \
                            on b.preferred_lang3_id = f.row_id \
                    where a.user_id = '{}';".format(user_id))

        user_data = cur.fetchall()

        cur.close()
        conn.close()
        if len(user_data) > 0:
            user_data = user_data[0]
        else:
            return False
        user = {
            'email': user_data[0],
            'first_name': user_data[1],
            'last_name': user_data[2],
            'gender': user_data[3],
            'date_of_birth': str(user_data[4]),
            'role': user_data[5],
            'preferred_lang1': user_data[6],
            'preferred_lang2': user_data[7],
            'preferred_lang3': user_data[8],
            'state': user_data[9],
            'city': user_data[10],
            'locality': user_data[11],
            'postal_code': user_data[12]
        }
        return user

    def create_user_main(self, user_dict):
        print(user_dict)
        first_name = user_dict['first_name']
        last_name = user_dict['last_name']
        gender = user_dict['gender']
        email = user_dict['email']
        password = user_dict['password']
        date_of_birth = user_dict['date_of_birth']
        role = user_dict['role']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT row_id from user_roles where role_name = '{}';".format(role))
        role_id = cur.fetchall()
        cur.execute("insert into user_account (first_name, last_name, gender, date_of_birth,\
                         role_id) \
                    values ('{}','{}','{}','{}',{});".format(first_name, last_name, gender, date_of_birth, role_id[0][0]))

        cur.execute("SELECT currval(pg_get_serial_sequence('user_account','user_id'));")
        ids = cur.fetchall()

        cur.execute("insert into user_login_data (user_id, password_hash, email_id ) \
                    values ('{}','{}','{}');".format(ids[0][0], password, email))

        conn.commit()
        cur.close()
        conn.close()
        return ids[0][0]

    def update_location(self, location_dict):
        user_id = location_dict['user_id']
        latitude = location_dict['latitude']
        longitude = location_dict['longitude']
        state = location_dict['state']
        city = location_dict['city']
        locality = location_dict['locality']
        postal_code = location_dict['postal_code']

        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("insert into user_location (state_name, city_name, locality, latitude, \
                                longitude, postal_code) \
                         values ('{}','{}','{}','{}','{}','{}');".format(state, city, locality,
                                                                         latitude, longitude, postal_code))

            cur.execute("SELECT currval(pg_get_serial_sequence('user_location','row_id'));")
            location_id = cur.fetchall()
            cur.execute("UPDATE user_account SET location_id='{}' \
                        where user_id = {};".format(location_id[0][0], user_id))
            conn.commit()
            cur.close()
            conn.close()
        except:
            return False
        return user_id

    def update_languages(self, language_dict):
        user_id = language_dict['user_id']
        preferred_lang1 = language_dict['preferred_lang1']
        preferred_lang2 = language_dict['preferred_lang2']
        preferred_lang3 = language_dict['preferred_lang3']

        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("UPDATE user_account SET preferred_lang1_id='{}', \
                            preferred_lang2_id='{}', \
                            preferred_lang3_id='{}' \
                        where user_id = {};".format(preferred_lang1, preferred_lang2,
                                                    preferred_lang3, user_id))
            conn.commit()
            cur.close()
            conn.close()
        except:
            return False
        return user_id

    def get_teacher_details(self, teacher_id, skill_id):
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("select b.email, b.first_name, b.last_name, b.gender, b.date_of_birth,\
                        c.hourly_charge, c.average_rating, a.name, \
                        d.language_name as preferred_lang1,\
                        e.language_name as preferred_lang2, f.language_name as preferred_lang3, \
                        g.state_name, g.city_name, g.locality, g.postal_code, b.preferred_lang1_id \
                    from user_account b \
                        inner join teacher_skills c\
                            on b.user_id = c.teacher_id \
                        inner join skills a\
                            on c.skill_id = a.row_id \
                        inner join user_location g  \
                            on b.location_id = g.row_id \
                        left join languages d \
                            on b.preferred_lang1_id = d.row_id \
                        left join languages e \
                            on b.preferred_lang2_id = e.row_id \
                        left join languages f \
                            on b.preferred_lang3_id = f.row_id \
                    where b.user_id = '{}' and c.skill_id = {};".format(teacher_id, skill_id))
        teacher_data = cur.fetchall()
        cur.close()
        conn.close()
        if len(teacher_data) > 0:
            teacher_data = teacher_data[0]
        else:
            return False
        teacher = {
            'email': teacher_data[0],
            'first_name': teacher_data[1],
            'last_name': teacher_data[2],
            'gender': teacher_data[3],
            'date_of_birth': str(teacher_data[4]),
            'hourly_charge': teacher_data[5],
            'average_rating': str(round(teacher_data[6],2)),
            'skill': teacher_data[7],
            'preferred_lang1': teacher_data[8],
            'preferred_lang2': teacher_data[9],
            'preferred_lang3': teacher_data[10],
            'state': teacher_data[11],
            'city': teacher_data[12],
            'locality': teacher_data[13],
            'postal_code': teacher_data[14],
            'language_id': teacher_data[15]
        }
        return teacher
