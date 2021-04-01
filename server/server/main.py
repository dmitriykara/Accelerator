import socket
import json
from flask import Flask, request
from flask_cors import CORS
from predict import get_letter, get_word, get_predictions, get_text
import websocket

app = Flask(__name__)
CORS(app)

front = websocket.WebSocket()
front.connect("ws://localhost:5000/")

@app.route('/motion', methods=['POST'])
def motion():
    data = request.get_json()
    
    motion = data["motion"]
    letter = ""
    word = ""
    selection = ""
    predicts = []
    text = get_text("")

    if motion.startswith("Move"):
        motion = motion[4:]

    if motion in ["Forward", "Backward", "Left", "Right"]:
        letter = get_letter(motion)
        word = get_word(letter)
        predicts = get_predictions(letter)
    elif motion == "Up":
        predicts = get_predictions()
        selection = predicts[0]
        text = get_text(selection)
    elif motion == "Down":
        predicts = get_predictions()
        selection = predicts[1]
        text = get_text(selection)
    else:
        return 'OK', 200

    new_msg = {
        "motion": motion,
        "word": word,
        "predictions": predicts,
        "selection": selection,
        "text": text,
    }
    print(new_msg)
   
    front.send(json.dumps(new_msg))

    return 'OK', 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)