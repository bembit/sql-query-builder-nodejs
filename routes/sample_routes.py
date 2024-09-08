from flask import Blueprint, request, jsonify
from models.sample_data import get_sample_data

sample_blueprint = Blueprint('sample', __name__)

@sample_blueprint.route('/', methods=['GET'])
def sample_data_route():
    table_name = request.args.get('table')  # Get the table name from the query parameter
    
    if not table_name:
        return jsonify({'error': 'Table name is required'}), 400

    try:
        data = get_sample_data(table_name)
        return jsonify({'rows': data})
    except Exception as e:
        print(f"Error fetching sample data: {e}")
        return jsonify({'error': str(e)}), 500
