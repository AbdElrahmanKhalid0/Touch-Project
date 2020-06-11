from flask import Flask, request
import json
import pyautogui as p
from flask_socketio import SocketIO, send
import os

app = Flask(__name__)
# replace with any secret key
app.config["SECRET_KEY"] = os.environ.get('SECRET_KEY')
socketio = SocketIO(app, cors_allowed_origins="*")
p.FAILSAFE = False

# move handle
@socketio.on('move')
def move(data):
    x = data['changeX'] + p.position().x
    y = data['changeY'] + p.position().y
    p.moveTo(x,y)

# click handle
@socketio.on('click')
def click():
    p.click()

if __name__ == '__main__':
    print('started')
    socketio.run(app,host='0.0.0.0',port=1717)
