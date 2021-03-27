import socket
import pickle
from flask import Flask, request
from predict import get_letter, get_word, get_predictions

app = Flask(__name__)

front = socket.socket()
front.connect(('localhost', 5000))

@app.route('/motion', methods=['POST'])
def motion():
    data = request.get_json()
    
    motion = data["motion"]
    letter = ""
    word = ""
    selection = ""
    predicts = []

    if motion in ["Forward", "Backward", "Left", "Right"]:
        letter = get_letter(motion)
        word = get_word(letter)
        predicts = get_predictions(letter)
    elif motion == "Up":
        predicts = get_predictions()
        selection = predicts[0]
    elif motion == "Down":
        predicts = get_predictions()
        selection = predicts[1]
    else:
        return 'OK', 200

    new_msg = {
        "motion": motion,
        "word": word,
        "predictions": predicts,
        "selection": selection,
    }
    print(new_msg)
   
    front.send(pickle.dumps(new_msg))

    return 'OK', 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)