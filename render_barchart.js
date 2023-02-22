import * as d3 from 'd3';

export function initializeGraphic(svgHeight, svgWidth, margins) {
  d3.select('#barchart').attr('height', `${svgHeight + margins.top + margins.bottom}px`);
  d3.select('#barchart').attr('width', `${svgWidth + margins.left + margins.right}px`);

  const svg = d3.select('#barchart');

  // append x axis element with default attributes
  svg
      .append('g')
      .classed('graph-x-axis', true)
      .attr('transform', `translate(${0}, ${svgHeight + margins.top})`);


  // append y axis element with default attributes
  svg
      .append('g')
      .classed('graph-y-axis', true)
      .attr('transform', `translate(${margins.left / 2}, ${margins.top})`);
}


export function renderBarchart(dta, svgHeight, svgWidth, margins, euroFormat) {
  // Bars should take half the space inside the chart.
  // The other half should be whitespace.
  const barWidth = svgWidth / dta.length / 2;
  // We have to shift the x axis by the left margin
  // Additionally the default axis points to the beginning of a bar
  // so we want to center it by adding half the bar width as offset
  const xAxisOffset = margins.left - (barWidth / 2);

  const dtaMax = d3.max(dta.map((d) => d.value));

  const svg = d3.select('#barchart');

  let svgBars = svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category);

  const xScale = d3
      .scaleBand()
      .domain(dta.map((d) => d.category))
      .range([0, svgWidth]);

  const yScale = d3
      .scaleLinear()
      .domain([0, dtaMax * 1.1]) // add offset to max
      .range([svgHeight, 0]);

  const xAxis = d3
      .axisBottom(xScale);

  const yAxis = d3
      .axisLeft(yScale)
      .tickSize(-(svgWidth + margins.left + margins.right))
      .tickFormat((d) => euroFormat(d));

  // remove deleted data points
  svgBars
      .exit()
      .remove();

  // render new datapoints with default options
  svgBars
      .enter()
      .append('rect')
      .classed('data_point', true)
      .attr('x', (d) => svgWidth + margins.left + margins.right)
      .attr('y', margins.top + svgHeight)
      .attr('height', 0)
      .attr('width', barWidth);

  const defaultT = d3
      .transition('default_t')
      .ease(d3.easeLinear)
      .duration(1000);

  // refresh selection with newly created items
  svgBars = svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category);

  // update all datapoints with smooth transitions
  svgBars
      .transition(defaultT)
      .attr('width', barWidth)
      .attr('x', (d) => margins.left + xScale(d.category));

  // update the bar height of all data points
  svgBars
      .transition('height_t')
      .ease(d3.easeLinear)
      // .duration((d) => {
      //   return 1000 * d.value / dtaMax;
      // })
      .duration(1000)
      .attr('height', (d) => svgHeight - yScale(d.value))
      .attr('y', (d) => margins.top + yScale(d.value));

  // render x axis
  svg
      .selectAll('.graph-x-axis')
      .transition()
      .duration(1000)
      .attr('transform', `translate(${xAxisOffset}, ${svgHeight + margins.top})`)
      .call(xAxis);


  // render y axis
  svg
      .selectAll('.graph-y-axis')
      .transition()
      .duration(1000)
      .call(yAxis);

  // style y axis line
  svg
      .selectAll('.graph-y-axis')
      .selectAll('.tick')
      .selectAll('line')
      .attr('opacity', 0.2);


  let svgBarText = svg
      .selectAll('.value-text')
      .data(dta, (d) => d.category);

  // remove deleted data annotations
  svgBarText
      .exit()
      .remove();

  // add new data annotations
  svgBarText
      .enter()
      .append('text')
      .classed('value-text', true)
      .attr('x', (d) => margins.left + xScale(d.category) + (barWidth / 2))
      .attr('y', (d) => margins.top + yScale(d.value) - 10);

  // refresh selection with newly created items
  svgBarText = svg
      .selectAll('.value-text')
      .data(dta, (d) => d.category);

  // update data annotations
  svgBarText
      .text((d) => euroFormat(d.value))
      .transition('oadjasdjo')
      .ease(d3.easeLinear)
      .duration(1000)
      .attr('x', (d) => margins.left + xScale(d.category) + (barWidth / 2))
      .attr('y', (d) => margins.top + yScale(d.value) - 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('fill', 'green');
}
