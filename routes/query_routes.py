from flask import Blueprint
from controllers.query_controller import run_query

# Define the Blueprint for query-related routes
query_blueprint = Blueprint('query', __name__)

# Define the route to handle running a query
@query_blueprint.route('/', methods=['POST'])
def query_route():
    return run_query()
