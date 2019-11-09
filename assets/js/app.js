// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("../data/data.csv")
    .then(function(stateData) {

        stateData.forEach(function(data) {
            data.poverty = +data.poverty;
            data.povertyMoe = +data.povertyMoe;
            data.age = +data.age;
            data.ageMoe = +data.ageMoe;
            data.income = +data.income;
            data.incomeMoe = +data.incomeMoe;
            data.healthcare = +data.healthcare;
            data.healthcareLow = +data.healthcareLow;
            data.healthcareHigh = +data.healthcareHigh;
            data.obesity = +data.obesity;
            data.obesityLow = +data.obesityLow;
            data.obesityHigh = +data.obesityHigh;
            data.smokes = +data.smokes;
            data.smokesLow = +data.smokesLow;
            data.smokesHigh = +data.smokesHigh;
        });

        var xScale = d3.scaleLinear()
            .domain([20,d3.max(stateData, d => d.income)])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(stateData, d => d.obesity)])
            .range([height, 0]);

        var bottomAxis = d3.axisBottom(xScale);
        var leftAxis = d3.axisLeft(yScale);

        chartGroup.append("g")
            attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        var circlesGroup = chartGroup.selectAll("circle")
            .data(stateData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.income))
            .attr("cy", d => yScale(d.obesity))
            .attr("r", "15")
            .attr("fill", "saddlebrown")
            .attr("opacity", "1")
            .text(`${d.abbr}`);

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
