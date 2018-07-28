import os
import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import json

from flask import Flask, jsonify, render_template, request

# Database Setup
engine = create_engine("sqlite:///database.sqlite")

# Flask Setup
app = Flask(__name__)


# Flask Routes

# Website Home Page


@app.route('/')
def welcome():
    return render_template('index.html')


# Tableau
@app.route("/tableau")
def projectmainpage1():
    return render_template("tableau.html")

# Project Main Page


@app.route("/projects")
def projectmainpage2():
    return render_template("projects.html")

# ML Knowleage


@app.route("/ml_knowledge")
def knowledge():
    return render_template("machine_learning.html")

# Acknowledgements


@app.route("/acknowledgments")
def acknowledgments():
    return render_template("acknowledgments.html")

# Team Infos


@app.route("/meet_the_team")
def team():
    return render_template("meet_the_team.html")


# ML Model Test
@app.route("/ml_input")
def input():
    return render_template('ml_input.html')


@app.route("/result", methods=['GET', 'POST'])
def output():
    data = {"sucess": False}
    if request.methods == 'POST':
        request = request.form
        return render_template("ml_result.html", result=result)


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
    return jsonify(df.to_dict(orient="records"))

# Bubble Chart


query_1 = """select
category, age, year, sum(population) as population
from test_table

group by category, age, year
"""


@app.route("/api/bubble_chart")
def bubble_chart_data():
    # Return the data
    df = pd.read_sql_query(query_1, engine)
    return jsonify(df.to_dict(orient="records"))


if __name__ == '__main__':
    app.run(debug=True)
