from flask import Flask, render_template, request
from openai import OpenAI
import os
app = Flask(__name__)
client = OpenAI(api_key="sk-xxxxxxxxxxxxxxxx")
@app.route("/", methods=["GET", "POST"])
def index():
    image_url = None
    if request.method == "POST":
        prompt = request.form["prompt"]

        result = client.images.generate(
            model="gpt-image-1",
            prompt=prompt,
            size="512x512"
        )
        image_url = result.data[0].url
    return render_template("index.html", image_url=image_url)
if __name__ == "__main__":
    app.run(debug=True)
