import psycopg2
from psycopg2 import pool

try:
    connection_pool = psycopg2.pool.SimpleConnectionPool(
        1, 20,
        user='postgres',
        password='root',
        host='localhost',
        port='5432',
        database='postgres'
    )

    if connection_pool:
        print("Connection pool created successfully")

except Exception as error:
    print("Error while connecting to PostgreSQL", error)

def get_connection():
    return connection_pool.getconn()

def release_connection(conn):
    connection_pool.putconn(conn)
