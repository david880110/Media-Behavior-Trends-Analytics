import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import json

from flask import Flask, jsonify, render_template


# Database Setup
engine = create_engine("sqlite:///database.sqlite")

# Flask Setup
app = Flask(__name__)

# Flask Routes

# Website Home Page


@app.route('/')
def welcome():
    return render_template('index.html')


@app.route("/tableau")
def projectmainpage1():
    return render_template("tableau.html")


@app.route("/projects")
def projectmainpage2():
    return render_template("projects.html")


@app.route("/ml_knowledge")
def knowledge():
    return render_template("machine_learning.html")


@app.route("/acknowledgments")
def acknowledgments():
    return render_template("acknowledgments.html")


@app.route("/meet_the_team")
def team():
    return render_template("meet_the_team.html")


# ORM Process
# Stacked Chart (test_data)
query = """
SELECT *
FROM test_table
"""


@app.route("/api/stacked_chart")
def summary_data():
    # Return the data
    df = pd.read_sql_query(query, engine)
    return df.to_json(orient="records")


if __name__ == '__main__':
    app.run(debug=True)
