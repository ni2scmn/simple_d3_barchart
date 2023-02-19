import * as d3 from 'd3';
import {generate_data} from './utils.js'


let svg_height = 500;
let svg_width = 500;

let margins = {top: 30, bottom: 50, left: 50, right: 50};


d3.select('#thebutton')
    .on('click', () => render_barchart(generate_data(), svg_width, svg_height, margins));

render_barchart(generate_data(), svg_width, svg_height, margins);



function render_barchart(dta, svg_width, svg_height, margins) {

    d3.select('#graphic').attr('height', `${svg_height+margins.top+margins.bottom}px`);
    d3.select('#graphic').attr('width', `${svg_width+margins.left+margins.right}px`);

    let bar_width = svg_width / dta.length / 2;

    let xScale = d3
        .scaleBand()
        .domain(dta.map(d => d.category))
        .range([0, svg_width]);

    let yScale = d3
        .scaleLinear()
        // .domain([0, d3.max(dta.map(d => d.value))])
        .domain([0, 20])
        .range([0, svg_height]);

    let xAxis = d3
        .axisTop(xScale);

    let svg = d3.select('#graphic');

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

    svg
        .selectAll('.graph-axis')
        .remove()

    let axis_offset = margins.left - (bar_width/2);

    svg
        .append('g')
        .classed('graph-axis', true)
        .attr("transform", `translate(${axis_offset}, 20)`)
        .call(xAxis);
}

