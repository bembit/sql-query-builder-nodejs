from flask import Blueprint
from .query_routes import query_blueprint
from .schema_routes import schema_blueprint
from .sample_routes import sample_blueprint

api_blueprint = Blueprint('api', __name__)

api_blueprint.register_blueprint(query_blueprint, url_prefix='/query')
api_blueprint.register_blueprint(schema_blueprint, url_prefix='/schema')
api_blueprint.register_blueprint(sample_blueprint, url_prefix='/sample-data')
