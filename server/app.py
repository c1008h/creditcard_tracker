from flask import Flask
from routes.cards import bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Register the routes from the cards module
app.register_blueprint(bp)

if __name__ == '__main__':
    app.run(debug=True)
