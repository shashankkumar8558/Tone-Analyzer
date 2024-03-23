from flask import Flask, request, jsonify
#import subprocess
import speech_recognition as sr
from flask_cors import CORS

import textwrap
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

recognizer = sr.Recognizer()

@app.route('/recognize-speech', methods=['POST'])
def recognize_speech(): 
    with open("word_print.txt", "w") as f:
        f.write("Click On Mic To Start...")
    try:
        # Use the default microphone as the audio source
        with sr.Microphone() as source:
            #print("Listening...")
            with open("word_print.txt", "w") as f:
                f.write("Listening...")

            # Reopen the file to read its contents
            with open("word_print.txt", "r") as f:
                print(f.read())

            # Adjust for ambient noise
            recognizer.adjust_for_ambient_noise(source)

            # Capture audio data from the microphone
            audio_data = recognizer.listen(source)

            #print("Recognizing...")
            with open("word_print.txt", "w") as f:
                f.write("Recognizing...")
    
            # Reopen the file to read its contents
            with open("word_print.txt", "r") as f:
                print(f.read())
            # Recognize speech using Google Speech Recognition
            text = recognizer.recognize_google(audio_data)

            print(text)

            with open("data.txt", "w") as f:
                f.write(text)

            # Execute the second file
            #subprocess.run(["python", "try_real_my_script.py"])

            with open("word_print.txt", "w") as f:
                f.write("Click On Mic To Start...")

            return jsonify(text)
    
    except sr.UnknownValueError:
        with open("word_print.txt", "w") as f:
            f.write("Click On Mic To Start...")
        return "Sorry, I could not understand what you said."
    except sr.RequestError as e:
        with open("word_print.txt", "w") as f:
            f.write("Click On Mic To Start...")
        return "Could not request results from Google Speech Recognition service; {0}".format(e)

if __name__ == '__main__':
    app.run(debug=True)
