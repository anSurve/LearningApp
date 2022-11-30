import os
import psycopg2
import settings as conf


def get_db_connection():
    conn = psycopg2.connect(
        host=conf.db_host,
        database=conf.database,
        user=conf.db_user,
        password=conf.db_pass)
    return conn
