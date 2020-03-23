from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
from flask_socketio import SocketIO
import json

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
socketio = SocketIO(app)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# sanity check route
@app.route('/api/getWords', methods=['GET'])
def getWords():
    with open('words_definitions.json') as fin:
        words = json.load(fin)
    return jsonify(words)

@socketio.on('answer')
def submitAnswer(answer):
    return answer


if __name__ == '__main__':
    socketio.run(app)
