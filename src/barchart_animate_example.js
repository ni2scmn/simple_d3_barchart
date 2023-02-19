import * as d3 from 'd3';
import { generate_data } from './utils.js'


let svg_height = 500;
let svg_width = 500;

let margins = { top: 30, bottom: 50, left: 50, right: 50 };

d3.select('#graphic').attr('height', `${svg_height + margins.top + margins.bottom}px`);
d3.select('#graphic').attr('width', `${svg_width + margins.left + margins.right}px`);

// let bar_width = svg_width / dta.length / 2;
// let y_axis_offset = margins.left - (bar_width / 2);

let svg = d3.select('#graphic');

svg
    .append('g')
    .classed('graph-x-axis', true)
    .attr("transform", `translate(${0}, 20)`)

svg
    .append('g')
    .classed('graph-y-axis', true)
    .attr("transform", `translate(${margins.left / 2}, ${margins.top})`)



d3.select('#thebutton')
    .on('click', () => render_barchart(generate_data(), svg_width, svg_height, margins));


function render_barchart(dta, svg_width, svg_height, margins) {

    let bar_width = svg_width / dta.length / 2;
    let y_axis_offset = margins.left - (bar_width / 2);


    let xScale = d3
        .scaleBand()
        .domain(dta.map(d => d.category))
        .range([0, svg_width]);

    let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dta.map(d => d.value + 3))])
        .range([0, svg_height]);

    let xAxis = d3
        .axisTop(xScale);

    let yAxis = d3
        .axisLeft(yScale);

    svg
        .selectAll('.data_point')
        .data(dta, d => d.category)
        .exit()
        .remove();

    svg
        .selectAll('.data_point')
        .data(dta, d => d.category)
        .enter()
        .append('rect')
        .classed('data_point', true)

    svg
        .selectAll('.data_point')
        .data(dta, d => d.category)
        .attr('x', d => margins.left + xScale(d.category))
        .attr('y', margins.top)
        .attr('height', 0)
        .attr('width', bar_width)
        .transition()
        .ease(d3.easeLinear)
        .duration((d, i, e) => {
            console.log(d);
            console.log(e);
            return 3000 * d.value / 20;
        })
        .attr('height', d => yScale(d.value));

    svg
        .selectAll('.data_point')
        .data(dta, d => d.category)
        .transition()
        .ease(d3.easeLinear)
        .duration(d => {
            console.log(d);
            return 3000 * d.value / 20;
        })
        .attr('height', d => yScale(d.value));

    // svg
    //     .selectAll('.graph-x-axis')
    //     .remove()


    // svg
    //     .selectAll('.graph-y-axis')
    //     .remove()



    svg
        .selectAll('.graph-x-axis')
        .transition()
        .duration(1000)
        .attr("transform", `translate(${y_axis_offset}, 20)`)
        .call(xAxis);


    svg
        .selectAll('.graph-y-axis')
        .transition()
        .duration(1000)
        .call(yAxis);

}

