import socket
import json
from flask import Flask, request
from flask_cors import CORS
from predict import get_letter, get_word, get_predictions, get_text
import websocket
try:
    import thread
except ImportError:
    import _thread as thread
import time
import asyncio
import websockets
import threading

app = Flask(__name__)
CORS(app)

buff = []

@app.route('/motion', methods=['POST'])
def motion():
    data = request.get_json()
    
    motion = data["motion"]
    letter = ""
    predicts = []
    text = get_text("")

    if motion == "MoveLeft":
        motion = "Forward"
    
    if motion == "MoveRight":
        motion = "Backward"

    if motion in ["Forward", "Backward", "Left", "Right"]:
        letter = get_letter(motion)
        predicts = get_predictions(letter)
        text = get_text()
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
        "predictions": predicts,
        "text": text,
    }

    buff.append(json.dumps(new_msg, ensure_ascii=False,))

    return 'OK', 200

async def serve(websocket, path):
    name = await websocket.recv()
    print(f"< {name}")
    while True:
        for msg in buff:
            await websocket.send(msg)
            print(msg)
        buff.clear()
        time.sleep(0.1)

if __name__ == "__main__":
    start_server = websockets.serve(serve, "0.0.0.0", 5000)

    t = threading.Thread(target=app.run, kwargs={
        'host': '0.0.0.0', 
        'port': 6000
    })
    t.start()

    try:
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()
    except KeyboardInterrupt:
        exit(0)
    