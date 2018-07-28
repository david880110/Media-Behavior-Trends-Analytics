let data_url = "/api/bubble_chart";

Plotly.d3.json(data_url, function (err, data) {
    // Create a lookup table to sort and regroup the columns of data,
    // first by year, then by population:
    let lookup = {};
    function getData(year, population) {
    let byYear, trace;
    if (!(byYear = lookup[year])) {;
            byYear = lookup[year] = {};
    }

     // If a container for this year + population doesn't exist yet,
     // then create one:
    if (!(trace = byYear[population])) {
      trace = byYear[population] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }

    // Go through each row, get the right trace, and append the data:
    for (let i = 0; i < data.length; i++) {
        let datum = data[i];
        let trace = getData(datum.year, datum.population);
        trace.text.push(`Category: ${datum.category}<br>population: ${datum.population}<br>Age: ${datum.age} `);
        trace.id.push(datum.category);
        trace.x.push(datum.age);
        trace.y.push(datum.population);
        trace.marker.size.push(datum.population*100);
  }


// var plotDiv = document.getElementById('plot');
// var traces = [
//     {x: [1,2,3], y: [2,1,4], fill: 'tozeroy'},
//     {x: [1,2,3], y: [1,1,2], fill: 'tonexty'},
//     {x: [1,2,3], y: [3,0,2], fill: 'tonexty'}
// ];


function stackedArea(traces) {
    for(var i=1; i<traces.length; i++) {
        for(var j=0; j<(Math.min(traces[i]['y'].length, traces[i-1]['y'].length)); j++) {
            traces[i]['y'][j] += traces[i-1]['y'][j];
        }
    }
    return traces;
}

Plotly.newPlot(plotDiv, stackedArea(traces), {title: 'population vs age'});
