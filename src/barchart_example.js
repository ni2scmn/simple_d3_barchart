import * as d3 from 'd3';

const dta = d3.csvParse(`category,value
a,10
b,20
c,0
d,15
g,20
e,4
f,16`).map((d) => {
  d['value'] = parseInt(d['value']);
  return d;
});

renderBarchart(dta);

function renderBarchart(dta) {
  const xScale = d3
      .scaleBand()
      .domain(dta.map((d) => d.category))
      .range([0, 500]);

  const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dta.map((d) => d.value))])
      .range([0, 500]);

  const xAxis = d3
      .axisTop(xScale);

  const svg = d3.select('#graphic');

  svg
      .selectAll('.data_point')
      .data(dta)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.category))
      .attr('y', 25)
      .attr('height', (d) => yScale(d.value))
      .attr('width', 20);


  svg
      .append('g')
      .attr('transform', 'translate(-25, 20)')
      .call(xAxis);
}

