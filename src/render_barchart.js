import * as d3 from 'd3';

const NL = d3.formatLocale({
  'decimal': '.',
  'thousands': ',',
  'grouping': [3],
  'currency': ['', '€'],
  'dateTime': '%a %b %e %X %Y',
  'date': '%m/%d/%Y',
  'time': '%H:%M:%S',
  'periods': ['AM', 'PM'],
  'days': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  'shortDays': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  'shortMonths': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
});

export function initializeGraphic(svgHeight, svgWidth, margins) {
  d3.select('#graphic').attr('height', `${svgHeight + margins.top + margins.bottom}px`);
  d3.select('#graphic').attr('width', `${svgWidth + margins.left + margins.right}px`);

  const svg = d3.select('#graphic');

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


export function renderBarchart(dta, svgHeight, svgWidth, margins) {
  const barWidth = svgWidth / dta.length / 2;
  const yAxisOffset = margins.left - (barWidth / 2);

  const svg = d3.select('#graphic');

  const xScale = d3
      .scaleBand()
      .domain(dta.map((d) => d.category))
      .range([0, svgWidth]);

  const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dta.map((d) => d.value)) + 3]) // add offset to max
      .range([svgHeight, 0]);

  const xAxis = d3
      .axisBottom(xScale);

  const yAxis = d3
      .axisLeft(yScale)
      .tickSize(-(svgWidth + margins.left + margins.right))
      .tickFormat(NL.format('$,.0f'));

  // remove deleted data points
  svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category)
      .exit()
      .remove();

  // render new datapoints with default options
  svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category)
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

  // update all datapoints with smooth transitions
  svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category)
      .transition(defaultT)
      .attr('width', barWidth)
      .attr('x', (d) => margins.left + xScale(d.category));

  // update the bar height of all data points
  svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category)
      .transition('height_t')
      .ease(d3.easeLinear)
      .duration((d) => {
        return 3000 * d.value / 20;
      })
      .attr('height', (d) => svgHeight - yScale(d.value))
      .attr('y', (d) => margins.top + yScale(d.value));

  // render x axis
  svg
      .selectAll('.graph-x-axis')
      .transition()
      .duration(1000)
      .attr('transform', `translate(${yAxisOffset}, ${svgHeight + margins.top})`)
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
}
