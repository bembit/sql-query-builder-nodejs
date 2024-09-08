from flask import Flask
from routes import api_blueprint

app = Flask(__name__, static_folder='public', static_url_path='')

# Serve the index.html at the root URL
@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

# Serve the db-editor.html at /db-editor
@app.route('/db-editor')
def serve_editor():
    return app.send_static_file('db-editor.html')

# Register the API blueprint
app.register_blueprint(api_blueprint, url_prefix='/api')

for rule in app.url_map.iter_rules():
    print(rule)

if __name__ == '__main__':
    app.run(port=3001, debug=True)

