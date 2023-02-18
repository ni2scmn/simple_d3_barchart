import * as d3 from 'd3';

let dta = d3.csvParse(`category,value
a,10
b,20
c,0
d,15
g,20
e,4
f,16`).map(d => {
    d["value"] = parseInt(d["value"]);
    return d;
})

render_barchart(dta);  

function render_barchart(dta) {
    let xScale = d3
        .scaleBand()
        .domain(dta.map(d => d.category))
        .range([0, 500]);

    let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dta.map(d => d.value))])
        .range([0, 500]);

    let xAxis = d3
        .axisTop(xScale);

    let svg = d3.select('#graphic');

    svg
        .selectAll('.data_point')
        .data(dta)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.category))
        .attr('y', 25)
        .attr('height', d => yScale(d.value))
        .attr('width', 20);


        svg
        .append('g')
        .attr("transform", "translate(-25, 20)")
        .call(xAxis);
}

