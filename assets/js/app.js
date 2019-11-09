// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 750;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("./assets/data/data.csv")
    .then(function(stateData) {
        console.log(stateData);
        console.log(stateData.obesity);

        stateData.forEach(function(data) {
            stateData.poverty = +data.poverty;
            stateData.povertyMoe = +data.povertyMoe;
            stateData.age = +data.age;
            stateData.ageMoe = +data.ageMoe;
            stateData.income = +data.income;
            stateData.incomeMoe = +data.incomeMoe;
            stateData.healthcare = +data.healthcare;
            stateData.healthcareLow = +data.healthcareLow;
            stateData.healthcareHigh = +data.healthcareHigh;
            stateData.obesity = +data.obesity;
            stateData.obesityLow = +data.obesityLow;
            stateData.obesityHigh = +data.obesityHigh;
            stateData.smokes = +data.smokes;
            stateData.smokesLow = +data.smokesLow;
            stateData.smokesHigh = +data.smokesHigh;
            stateData.abbr = data.abbr;
        });

        // var xData = [];
        // var yData = [];

        // stateData.forEach(function(data) {
        //     console.log(`smokes: ${data.smokes}`);
        //     console.log(`income: ${data.income}`)
        //     yData.push(data.smokes);
        //     xData.push(data.inocme);
        // });

        // console.log(`xData: ${xData}`);
        // console.log(`yData: ${yData}`);

        var xScale = d3.scaleLinear()
            .domain([20,d3.max(stateData, d => d.income)])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(stateData, d => d.obesity)])
            .range([height, 0]);

        // console.log(d3.max(yData));
        // console.log(d3.max(xdata));

        var bottomAxis = d3.axisBottom(xScale);
        var leftAxis = d3.axisLeft(yScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        var circlesGroup = chartGroup.selectAll("circle")
            .data(stateData)
            .enter();

        circlesGroup.append("circle")
            .attr("cx", d => xScale(d.income))
            .attr("cy", d => yScale(d.obesity))
            .attr("r", "20")
            .attr("fill", "cadetblue")
            .attr("opacity", ".75");

        circlesGroup.append("text")
        .text(function(d) {
            return d.abbr;
        })
        .attr("dx", function(d) {
            return xScale(d.income) + 15/2.5;
        })
        .attr("dy", function(d) {
            return yScale(d.obesity) + 20/2;
        })
        .attr("text-anchor", "middle");

        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height/2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Obesity");

        chartGroup.append("text")
            .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("Income");
    });
