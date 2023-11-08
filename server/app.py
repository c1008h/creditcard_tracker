from flask import Flask
from routes.cards import bp

app = Flask(__name__)

# Register the routes from the cards module
app.register_blueprint(bp)

if __name__ == '__main__':
    app.run()
