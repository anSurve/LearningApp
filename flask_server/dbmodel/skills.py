from postgres.main import get_db_connection


def get_list_of_skills():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("select distinct name, row_id \
                from  skills b")
    skills = cur.fetchall()
    cur.close()
    conn.close()
    if len(skills) > 0:
        skills_lst = list()
        for skill in skills:
            skills_lst.append(skill[0])
        return skills_lst
    else:
        return False
