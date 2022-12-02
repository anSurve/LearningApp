from postgres.main import get_db_connection


def get_past_teachings(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("select a.first_name, a.last_name, b.name as skill, c.row_id, \
                c.start_date, c.end_date, CASE WHEN c.end_date IS NOT NULL THEN 'Completed' \
                ELSE 'In-Progress' END AS status  \
                from  user_account a, skills b, learning_data c \
                where c.student_id = a.user_id \
                and c.skill_id = b.row_id \
                and c.teacher_id = {}\
                order by start_date desc;".format(user_id))
    past_learnings = cur.fetchall()
    cur.close()
    conn.close()
    if len(past_learnings) > 0:
        teaching_lst = list()
        for learning in past_learnings:
            student_dict = {
                "first_name": learning[0],
                "last_name": learning[1],
                "skill": learning[2],
                "teaching_id": learning[3],
                "start_date": str(learning[4]),
                "end_date": str(learning[5]),
                "status": learning[6]
            }
            teaching_lst.append(student_dict)
        return teaching_lst
    else:
        return False


def get_teachings_stats(student_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("select count(skill_id),count(student_id) \
                        from learning_data where teacher_id = {};".format(student_id))
        skill_teacher_cnt = cur.fetchall()

        cur.execute("select count(1) from learning_data \
                    where end_date is not null and teacher_id = {};".format(student_id))
        finished_cnt = cur.fetchall()

        cur.execute("select count(1) from learning_data \
                    where end_date is null and teacher_id = {};".format(student_id))
        ongoing_cnt = cur.fetchall()
        resp = {
            "registered_skills": skill_teacher_cnt[0][0],
            "total_students": skill_teacher_cnt[0][1],
            "finished_teachings": finished_cnt[0][0],
            "ongoing_teachings": ongoing_cnt[0][0]
        }
        return resp
    except Exception as e:
        print(str(e))
        return False

