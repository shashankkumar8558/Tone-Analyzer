from flask import Flask, jsonify
import time
from flask_cors import CORS

app3 = Flask(__name__)
CORS(app3)  # Enable CORS for all routes

def get_status():
    with open("word_print.txt", "r") as f:  
        return f.read()

@app3.route('/status', methods=['POST'])
def check():
    status = get_status()
    while status != "Recognizing...":
        status = get_status()
    return jsonify(status)

if __name__ == '__main__':
    app3.run(port=9898,debug=True)
