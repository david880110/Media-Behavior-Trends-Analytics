// call back function to get data on change input to update the gauge chart
function getDataGauge(pref_id){
    var url_gague = "/api/library" + pref_id;

    Plotly.d3.json(url_gague, function (error, dataGaugue)
        {
            gaugeChart(dataGaugue);
        });
}

// update the gauge chart with default value (111111)
var urlGauge = "/api/library/111111";
Plotly.d3.json(urlGauge, function(error, ) {
    if(error) return console.warn(error)

    var library = dataGaugue

    // Enter a class range between 0 and 180
    const coefficient = 180/10;
    var level = coefficient * library

    // Trig to calc meter point
    var degress = 190 - level,
        radius = .5;
    var radians = degrees * Math.PI /180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a bettwe triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = '',
        pathY = String(y),
        pathEnd = ' Z';

    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [{
        type: 'scatter',
        x: [0], y: [0],
        marker: { size:20, color: '#BF0803'},
        showlegend: false,
        name: 'Class',
        text: library,
        hoverinfo: 'text+name'
    },
    {
        values: [5 / 5, 5 / 5, 5 / 5, 5 / 5, 5 / 5, 5],
        rotation: 90,
        text: ['Frequently', 'Above-Average', 'Average', 'Below-Average',
                'Seldom', ''],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
                colors: ['#459373', '#6EAB92',
                    '#97C3B1', '#C1DBD0',
                    '#EAF3EF',
                    'rgb(255,255,255']
        },
        labels: ['8-10', '6-8', '4-6', '2-4', '0-2', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
    }];
})
