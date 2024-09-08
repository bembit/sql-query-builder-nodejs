from flask import request, jsonify
from models.db import get_connection, release_connection

def run_query():
    data = request.json
    query = data.get('query')

    if not isinstance(query, str) or not query.strip():
        return jsonify({'error': 'Invalid query'}), 400

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()
        return jsonify({'query': query, 'rows': rows})
    except Exception as e:
        return jsonify({'query': query, 'error': str(e)}), 500
    finally:
        release_connection(conn)
