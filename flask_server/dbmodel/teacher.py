from postgres.main import get_db_connection


def get_nearby_teachers(user_id, skill):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("select b.user_id, b.first_name,b.last_name, \
                b.gender, c.state_name, s.row_id, ts.average_rating, ts.hourly_charge, e.language_name \
                from teacher_skills ts, skills s, user_account a, user_account b, \
                    user_location c, user_location d, languages e \
                where ts.skill_id = s.row_id \
                    AND ts.teacher_id = b.user_id \
                    AND a.location_id = c.row_id \
                    AND b.location_id = d.row_id \
                    AND c.state_name = d.state_name \
                    AND b.preferred_lang1_id = e.row_id \
                    AND s.name='{}' \
                    AND a.user_id = {};".format(skill, user_id))
    nearby_teachers_data = cur.fetchall()
    cur.close()
    conn.close()
    if len(nearby_teachers_data) > 0:
        teachers = list()
        for teacher in nearby_teachers_data:
            print(teacher)
            teacher_dict = {
                "teacher_id": teacher[0],
                "first_name": teacher[1],
                "last_name": teacher[2],
                "gender": teacher[3],
                "state": teacher[4],
                "skill_id": teacher[5],
                "average_rating": str(round(teacher[6], 2)),
                "hourly_charge": teacher[7],
                "language": teacher[8],
                "skill": skill
            }
            teachers.append(teacher_dict)
        return teachers
    else:
        return False


def get_skill_id(skill):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("select row_id from skills where name='{}'".format(skill))
    skill_id = cur.fetchall()
    cur.close()
    conn.close()
    return skill_id[0][0]


def get_skill(skill_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("select name from skills where row_id='{}'".format(skill_id))
    skill = cur.fetchall()
    cur.close()
    conn.close()
    return skill[0][0]
