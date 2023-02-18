import * as d3 from 'd3';

// let dta = d3.csvParse(`category,value
// a,10
// b,20
// c,0
// d,15
// g,20
// e,4
// f,16`).map(d => {
//     d["value"] = parseInt(d["value"]);
//     return d;
// })

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function generate_data() {

    let alpha = "abcdefghijklmnopqrstuvwxyz";

    let data = [];

    for (let index = 0; index < 7; index++) {
        data.push({
            category: alpha[index],
            value: getRandomInt(20)
        })
        
    }

    return data;
}

d3.select('#thebutton')
    .on('click', () => render_barchart(generate_data()));

    d3.select('#thebuttontoo')
    .on('click', () => console.log('hello-world'));

function render_barchart(dta) {
    let xScale = d3
        .scaleBand()
        .domain(dta.map(d => d.category))
        .range([0, 500]);

    let yScale = d3
        .scaleLinear()
        // .domain([0, d3.max(dta.map(d => d.value))])
        .domain([0, 20])
        .range([0, 500]);

    let xAxis = d3
        .axisTop(xScale);

    let svg = d3.select('#graphic');

    svg
    .selectAll('.data_point')
    .remove()

    svg
        .selectAll('.data_point')
        .data(dta)
        .enter()
        .append('rect')
        .classed('data_point', true)
        .attr('x', d => xScale(d.category))
        .attr('y', 25)
        .attr('height', 0)
        .attr('width', 20)
        .transition()
        .ease(d3.easeLinear)
        .duration(d => {
            console.log(d);
            return 3000 * d.value / 20;
        })
        .attr('height', d => yScale(d.value));


    svg
        .append('g')
        .attr("transform", "translate(-25, 20)")
        .call(xAxis);

    // svg
    //     .selectAll('.data_point')
    //     .transition()
    //     .duration(3000)
    //     .attr('height', d => yScale(d.value))
}

