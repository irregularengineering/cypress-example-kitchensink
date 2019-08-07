"""
Usage:
python appleapp.py
"""

from flask import Flask, request, json
from flask import request


# App config.
DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = 'thisisareallygoodsecretmkay???'

@app.route("/", methods=['GET', 'POST'])
@app.route("/<username>", methods=['GET', 'POST'])
def button_text_route(username=""):

    print(username)

    if request.method == 'GET':
        accept_header = request.headers.get('Accept')
        
        if not username:
            button_text = "<p>Send to Paul</p>"
        else:
            button_text = "<p>Hello, {}</p>".format(username)
        #handle base case - no accept header given
        response = app.response_class(response=button_text,
                                      status=200
                                     )
        return response

    # POST request - just respond with something and a 200
    if request.method == 'POST':
        response = app.response_class(response="""There is no defined behaviour for POST""",
                                      status=200,
                                     )    
        return response

@app.route("/fruits", methods=['GET', 'POST'])
def fruit_list(username=""):


    # POST request - just respond with something and a 200
    if request.method == 'POST':
        response = app.response_class(response="""There is no defined behaviour for POST""",
                                      status=200,
                                     )    
        return response


if __name__ == "__main__":
    app.run()