from flask import Blueprint, jsonify
from models.schema import get_schema

# Define the Blueprint for schema-related routes
schema_blueprint = Blueprint('schema', __name__)

# Define the route to get the database schema
@schema_blueprint.route('/', methods=['GET'])
def schema_route():
    schema_data = get_schema()
    return jsonify(schema_data)
