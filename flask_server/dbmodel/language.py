from postgres.main import get_db_connection


def get_languages():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("select row_id, language_name from languages;")
    lang_data = cur.fetchall()
    cur.close()
    conn.close()
    if len(lang_data) > 0:
        languages = list()
        for lang in lang_data:
            language = {
                "row_id": lang[0],
                "language_name": lang[1]
            }
            languages.append(language)
        return languages
    else:
        return False


