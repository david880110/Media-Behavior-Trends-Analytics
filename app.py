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

from wtforms import Form, TextField, TextAreaField, validators, StringField, SubmitField

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


# ORM Process
# Stacked Chart (test_data)
query = """
SELECT *
FROM test_table
"""


@app.route("/api/stacked_chart")
def summary_data():
    # Return the data
    df_1 = pd.read_sql_query(query, engine)
    return jsonify(df_1.to_dict(orient="records"))

# Bubble Chart


query_1 = """select
category, age, year, sum(population) as population
from test_table

group by category, age, year
"""


@app.route("/api/bubble_chart")
def bubble_chart_data():
    # Return the data
    df_2 = pd.read_sql_query(query_1, engine)
    return jsonify(df_2.to_dict(orient="records"))


# ML Library
query_3 = """
SELECT result, pref_ID
from prediction_table
"""


@app.route("/api/library")
def ml_library():
    # Return the data
    df3 = pd.read_csv("all_possible_prediction.csv")
    df4 = pd.DataFrame(df3)
    key_list = list(df4['pref_ID'])
    value_list = list(df4['result'])
    test_list = []
    for i in range(0, len(key_list)):
        unit_dict = {}
        unit_dict[key_list[i]] = value_list[i]
        test_list.append(unit_dict)
    return jsonify(test_list)
    # return jsonify(df4.to_dict(orient="records"))


# Acquire Users' Inputs


'''
def get_time():
    time = strftime("%Y-%m-%dT%H:%M")
    return time


def write_to_disk(TV, Social_Media, Magazine, All_Lives, Video_Games, Tablet):
    data = open('file.csv')
    timestamp = get_time()
    data.write('DateStamp={}, TV={}, Social_Media={}, Magazine={}, All_Lives={}, Video_Games={}, Tablet={} \n'.format(timestamp, tv, social_media, magazine, all_lives, video_games, tablet))
    data.close()


@app.route("/", methods=['GET', 'POST'])
def get_post():
    form = ReusableForm(request.form)

    # print(form.errors)
    if request.method == 'POST':
        tv = request.form['tv']
        social_media = request.form['social_media']
        magazine = request.form['magazine']
        all_lives = request.form['all_lives']
        video_games = request.form['video_games']
        tablet = request.form['tablet']

        if form.validate():
            write_to_disk(tv, social_media, magazine, all_lives, video_games, tablet)
            flash('You Picked {} {}'.format(tv, social_media, magazine, all_lives, video_games, tablet))

        else:
            flash('Error: All Fields are Required')

    return render_template('projects.html', form=form)
'''

if __name__ == '__main__':
    app.run(debug=True)
