from models.db import get_connection, release_connection

def get_sample_data(table_name):
    if not table_name:
        return {"error": "Table name is required"}

    query = f"SELECT * FROM {table_name} LIMIT 10"

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

            # Fetch column names
            column_names = [desc[0] for desc in cursor.description]

            # Create a list of dictionaries for the rows
            results = [dict(zip(column_names, row)) for row in rows]
        return results
    except Exception as e:
        return {"error": str(e)}
    finally:
        release_connection(conn)
