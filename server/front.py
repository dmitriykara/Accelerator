import socket
import pickle

sock = socket.socket()
sock.bind(('', 5000))
sock.listen(1)
conn, addr = sock.accept()

print('connected:', addr)

while True:
    data = conn.recv(1024)
    if not data:
        continue

    msg = pickle.loads(data)
    print(msg)

conn.close()
