var priceMargen = 3;

var renderChart = function () {
    var priceTrace = {
        name: 'price',
        type: 'scatter',
        x: [Date.now()],
        y: [price]
    };

    var depthTrace = {
        name: 'volume diff',
        type: 'scatter',
        x: [Date.now()],
        y: [price],
        yaxis: 'y2'
    };

    var data = [priceTrace, depthTrace];

    var layout = {
        title: 'Volume diff (' + diff + ') and price (' + price + ') for ' + symbol.toUpperCase(),
        xaxis: {
            title: 'time',
        },
        yaxis: {
            title: 'price'
        },
        yaxis2: {
            title: 'depth',
            overlaying: 'y',
            side: 'right',
            range: [
                -300,
                300
            ]
        }
    };

    Plotly.newPlot('chart', data, layout);
}

var updateChart = function () {
    Plotly.extendTraces('chart', {
        x: [[priceTime]],
        y: [[price]]
    }, [0]);

    Plotly.extendTraces('chart', {
        x: [[depthTime]],
        y: [[diff]]
    }, [1]);

    Plotly.relayout('chart', {
        title: 'Volume diff (' + diff + ') and price (' + price + ') for ' + symbol.toUpperCase(),
        xaxis: {
            range: [
                new Date(Date.now() - 60 * 1000),
                priceTime
            ]
        },
        yaxis: {
            range: [
                Math.floor((price - 1) / 10) * 10,
                Math.ceil((price + 1) / 10) * 10
            ]
        }
    });
}
