let url = "/api/v1.0/market_share";

Plotly.d3.json(url, function (err, data) {
    // Create a lookup table to sort and regroup the columns of data,
    // first by year, then by studio:
    let lookup = {};
    function getData(year_id, Studio_name) {
    let byYear, trace;
    if (!(byYear = lookup[year_id])) {;
            byYear = lookup[year_id] = {};
    }
     // If a container for this year + studio doesn't exist yet,
     // then create one:
    if (!(trace = byYear[Studio_name])) {
      trace = byYear[Studio_name] = {
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
        let trace = getData(datum.year_id, datum.Studio_name);
        trace.text.push(`Studio: ${datum.Studio_name}<br>Total Gross: ${datum.Studio_Gross}<br>Studio_Gross: ${datum.Studio_Gross} %`);
        trace.id.push(datum.Studio_name);
        trace.x.push(datum.Studio_Gross);
        trace.y.push(datum.Percentage);
        trace.marker.size.push(datum.pop_size);
  }

    // Get the group names:
    let years = Object.keys(lookup);
    // In this case, every year includes every studio, so we
      // can just infer the studios from the *first* year:
      let firstYear = lookup[years[0]];
      let studios = Object.keys(firstYear);

      // Create the main traces, one for each studio:
      let traces = [];

      for (i = 0; i < studios.length; i++) {
        let data = firstYear[studios[i]];
         // One small note. We're creating a single trace here, to which
         // the frames will pass data for the different year_id. It's
         // subtle, but to avoid data reference problems, we'll slice
         // the arrays to ensure we never write any new data into our
         // lookup table:
        traces.push({
          name: studios[i],
          x: data.x.slice(),
          y: data.y.slice(),
          id: data.id.slice(),
          text: data.text.slice(),
          mode: 'markers',
          marker: {
            size: data.marker.size.slice(),
            sizemode: 'area',
            sizeref: 200000
          }
        });
      }

    // Create a frame for each year. Frames are effectively just
    // traces, except they don't need to contain the *full* trace
    // definition (for example, appearance). The frames just need
    // the parts the traces that change (here, the data).
      let frames = [];
      for (i = 0; i < years.length; i++) {
        frames.push({
          name: years[i],
          data: studios.map(function (Studio_name) {
            return getData(years[i], Studio_name);
          })
        })
      }

      // Now create slider steps, one for each frame. The slider
      // executes a plotly.js API command (here, Plotly.animate).
      // In this example, we'll animate to one of the named frames
      // created in the above loop.
      let sliderSteps = [];
      for (i = 0; i < years.length; i++) {
        sliderSteps.push({
          method: 'animate',
          label: years[i],
          args: [[years[i]], {
            mode: 'immediate',
            transition: {duration: 800},
            frame: {duration: 800, redraw: false},
          }]
        });
      }

      let layout = {
        xaxis: {
          title: 'Box Office',
          range: [0, 3000000000]
        },
        yaxis: {
          title: 'Market Share per Studio',
          range: [0, 0.4]
        },

        paper_bgcolor:'#D1D6E7',
        plot_bgcolor:'#D1D6E7',

        hovermode: 'closest',
         // We'll use updatemenus (whose functionality includes menus as
         // well as buttons) to create a play button and a pause button.
         // The play button works by passing `null`, which indicates that
         // Plotly should animate all frames. The pause button works by
         // passing `[null]`, which indicates we'd like to interrupt any
         // currently running animations with a new list of frames. Here
         // The new list of frames is empty, so it halts the animation.
        updatemenus: [{
          x: 0,
          y: 0,
          yanchor: 'top',
          xanchor: 'left',
          showactive: false,
          direction: 'left',
          type: 'buttons',
          pad: {t: 87, r: 10},
          buttons: [{
            method: 'animate',
            args: [null, {
              mode: 'immediate',
              fromcurrent: true,
              transition: {duration: 300},
              frame: {duration: 800, redraw: false}
            }],
            label: 'Play'
          }, {
            method: 'animate',
            args: [[null], {
              mode: 'immediate',
              transition: {duration: 0},
              frame: {duration: 0, redraw: false}
            }],
            label: 'Pause'
          }]
        }],
         // Finally, add the slider and use `pad` to position it
         // nicely next to the buttons.
        sliders: [{
          pad: {l: 130, t: 55},
          currentvalue: {
            visible: true,
            prefix: 'Year:',
            xanchor: 'right',
            font: {size: 20, color: '#666'}
          },
          steps: sliderSteps
        }]
      };

      // Create the plot:
      Plotly.plot('myDiv', {
        data: traces,
        layout: layout,
        frames: frames,
      });
    });
