from models.db import get_connection, release_connection

def get_schema():
    schema = {}
    table_query = """
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
    """

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(table_query)
            tables = cursor.fetchall()

            for table in tables:
                table_name = table[0]
                column_query = """
                    SELECT column_name, data_type, is_nullable, column_default 
                    FROM information_schema.columns 
                    WHERE table_name = %s
                """
                cursor.execute(column_query, (table_name,))
                columns = cursor.fetchall()

                schema[table_name] = [
                    {
                        'name': col[0],
                        'type': col[1],
                        'notNull': col[2] == 'NO',
                        'default': col[3]
                    }
                    for col in columns
                ]
        return schema
    except Exception as e:
        return {"error": str(e)}
    finally:
        release_connection(conn)
