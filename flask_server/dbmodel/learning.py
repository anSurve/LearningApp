from postgres.main import get_db_connection
from datetime import date


def get_past_learnings(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("select a.first_name, a.last_name, b.name as skill, c.feedback_id, c.row_id, \
                c.start_date, c.end_date, CASE WHEN c.end_date IS NOT NULL THEN 'Completed' \
                ELSE 'In-Progress' END AS status  \
                from  user_account a, skills b, learning_data c \
                where c.teacher_id = a.user_id \
                and c.skill_id = b.row_id \
                and c.student_id = {}\
                order by start_date desc;".format(user_id))
    past_learnings = cur.fetchall()
    cur.close()
    conn.close()
    if len(past_learnings) > 0:
        learning_lst = list()
        for learning in past_learnings:
            teacher_dict = {
                "first_name": learning[0],
                "last_name": learning[1],
                "skill": learning[2],
                "feedback_id": learning[3],
                "learning_id": learning[4],
                "start_date": str(learning[5]),
                "end_date": str(learning[6]),
                "status": learning[7]
            }
            learning_lst.append(teacher_dict)
        return learning_lst
    else:
        return False


def start_learning(student_id, teacher_id, skill_id, language_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        today = date.today()
        d2 = today.strftime("%Y-%m-%d")
        cur.execute("INSERT INTO learning_data(student_id, teacher_id, skill_id, language_id, start_date) \
                VALUES ({}, {}, {}, {}, '{}')".format(student_id, teacher_id, skill_id, language_id, d2))
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(str(e))
        return False
    return student_id


def submit_feedback(learning_id, skill_rating, lang_rating, comm_rating, punct_rating, comments):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        today = date.today()
        d2 = today.strftime("%Y-%m-%d")

        cur.execute("SELECT student_id, teacher_id, skill_id from learning_data where row_id = {}".format(learning_id))
        learning_data = cur.fetchall()
        student_id = learning_data[0][0]
        teacher_id = learning_data[0][1]
        skill_id = learning_data[0][2]

        cur.execute("INSERT INTO teacher_ratings(student_id, teacher_id, skill_id, skill_rating, language_rating,\
                    communication_rating, punctuality_rating, student_comments, feedback_date) \
                VALUES ({}, {}, {}, {}, {}, {}, {}, '{}', '{}')".format(student_id, teacher_id, skill_id, skill_rating,\
                                                                        lang_rating, comm_rating, punct_rating,\
                                                                        comments, d2))
        cur.execute("SELECT currval(pg_get_serial_sequence('teacher_ratings','row_id'));")
        feedback_id = cur.fetchall()
        cur.execute("UPDATE learning_data \
                    SET feedback_id = {},\
                    end_date = '{}'\
                    where row_id = {};".format(feedback_id[0][0], d2, learning_id))

        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(str(e))
        return False
    return learning_id
