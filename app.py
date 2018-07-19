import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import json

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///dataset/database.sqlite")

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

'''
@app.route("/")
def welcome():
    return (
        f"Welcome to the Consumer Behavior Analytics API!<br/>"
        f"Avalable Routes:<br/>"
        f"/api/v1.0/map_visualization<br/>"
        f"/api/v1.0/pending1<br/>"
        f"/api/v1.0/pending2<br/>"
        f"/api/v1.0/pending3<br/>"
        f"/api/v1.0/pending4<br/>"
        f"/api/v1.0/pending5<br/>"
    )
'''


@app.route('/')
def welcome():
    return render_template('index.html')


@app.route("/map")
def visualization():
    return render_template("map.html")

query_1 = """
SELECT
'northeast' as division,
AVG(Latitude) as Latitude,
AVG(Longitude) as Longitude

from coordinate_table

where State in ('CT', 'ME', 'MA', 'NH', 'RI', 'VT', 'NJ', 'NY', 'PA')

union

SELECT
'midwest' as division,
AVG(Latitude) as Latitude,
AVG(Longitude) as Longitude

from coordinate_table

where State in ('IL', 'IN', 'MI', 'OH', 'WI', 'IA', 'KS', 'MN', 'MS', 'NE', 'ND', 'SD')

union

SELECT
'south' as division,
AVG(Latitude) as Latitude,
AVG(Longitude) as Longitude

from coordinate_table

where State in ('DE', 'FL', 'GA', 'MD', 'NC', 'SC', 'VA', 'DC', 'WV', 'AL', 'KY', 'MS', 'TN', 'AR', 'LA', 'OK', 'TX')

union

SELECT
'west' as division,
AVG(Latitude) as Latitude,
AVG(Longitude) as Longitude

from coordinate_table

where State in ('AZ', 'CO', 'ID', 'MT', 'NV', 'NM', 'UT', 'WY', 'AK', 'CA', 'HI', 'OR', 'WA')


"""

# Mapping


@app.route("/api/v1.0/map_data")
def summary_data():
    """Return the data"""
    df = pd.read_sql_query(query, engine)
    return df.to_json(orient="records")


if __name__ == '__main__':
    app.run(debug=True)