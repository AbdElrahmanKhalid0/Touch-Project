from flask import Flask, request
from flask_cors import CORS
import json
import pyautogui as p

app = Flask(__name__)
CORS(app)

# move handle
@app.route('/move',methods=['POST'])
def move():
    data = json.loads(request.data.decode())
    x = data['x']
    y = data['y']
    p.moveTo(x,y)
    return "good"

# click handle
@app.route('/click', methods=['POST'])
def click():
    p.click()
    return "good"

if __name__ == '__main__':
    print('started')
    app.run(host='0.0.0.0',port=1717,debug=True)
