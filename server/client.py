import requests
import random
import time

motions = ["Forward", "Backward", "Left", "Right", "Stable", "Up", "Down", "MoveLeft", "MoveRight"]

while True: 
    msg = {
        "motion": motions[random.randint(0, len(motions) - 1)],
    }
    resp = requests.post('http://0.0.0.0:6000/motion', json=msg)
    print(resp.status_code)
    time.sleep(1)

sock.close()

