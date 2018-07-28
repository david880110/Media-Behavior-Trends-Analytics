let data_url = "/api/bubble_chart";

Plotly.d3.csv(data_url, function(err, data){

    function unpack(data, key) {
        return data.map(function(row) { return row[key]; });
    }

    var allAges = unpack(data, 'age'),
        allYear = unpack(data, 'year'),
        allPopulation = unpack(data, 'population'),
        listsofAges = [],
        currentAge,
        currentPopulation = [],
        currentYear = [];

    for (var i = 0; i < allAges.length; i++ ){
        if (listsofAges.indexOf(allAges[i]) === -1 ){
            listsofAges.push(allAges[i]);
        }
    }

    function getAgeData(chosenAge) {
        currentPopulation = [];
        currentYear = [];
        for (var i = 0 ; i < allAges.length ; i++){
            if ( allAges[i] === chosenAge ) {
                currentPopulation.push(allPopulation[i]);
                currentYear.push(allYear[i]);
            }
        }
    };

    // Default Age Data
    setBubblePlot('18-24');

    function setBubblePlot(chosenAge) {
        getAgeData(chosenAge);

        var trace1 = {
            x: currentYear,
            y: currentPopulation,
            mode: 'lines+markers',
            marker: {
                size: 12,
                opacity: 0.5
            }
        };

        var data = [trace1];

        var layout = {
            title:'Line and Scatter Plot',
            height: 600,
            width: 840
        };

        Plotly.newPlot('plotdiv', data, layout);
    };

    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        ageSelector = innerContainer.querySelector('.agedata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listsofAges, ageSelector);

    function updateAge(){
        setBubblePlot(ageSelector.value);
    }

    ageSelector.addEventListener('change', updateAge, false);
});
