import requests
import random
import time

letters = {
    "Left": "йцуфывячс",
    "Right": "нгшролть",
    "Forward": "щзхъджэбю",
    "Backward": "кеапми",
}

motions = ["Forward", "Backward", "Left", "Right", "Stable", "Up", "Down", "MoveLeft", "MoveRight"]

input = [
    "Backward", # п
    "Right",    # р
    "Backward", # и
    "Backward", # м
    "Backward", # е
    "Right",    # р
    "Up",       # _
    "Right",    # т
    "Backward", # е
    "Backward", # к
    "Left",     # с
    "Right",    # т
    "Backward", # а
    "Up",       # _
]

input2 = [
    "Left",     # п
    "Right",    # р
    "Left",     # и
    "Left",     # м
    "Left",     # е
    "Right",    # р
    "Up",       # _
    "Right",    # т
    "Left",     # е
    "Left",     # к
    "MoveLeft", # с
    "Right",    # т
    "Left",     # а
    "Up",       # _
]

i = 0
while True: 
    msg = {
        "motion": input[i],
    }
    i+= 1
    resp = requests.post('http://0.0.0.0:6000/motion', json=msg)
    print(resp.status_code)
    time.sleep(1)

sock.close()

