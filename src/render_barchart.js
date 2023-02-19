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

  svg
      .append('g')
      .classed('graph-x-axis', true)
      .attr('transform', `translate(${0}, 20)`);

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
      .domain([0, d3.max(dta.map((d) => d.value + 3))])
      .range([0, svgHeight]);

  const xAxis = d3
      .axisTop(xScale);

  const eur = NL.format('$,.2f');

  const yAxis = d3
      .axisLeft(yScale)
      .tickSize(-500)
      .tickFormat((d) => eur(d));

  svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category)
      .exit()
      .remove();

  svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category)
      .enter()
      .append('rect')
      .classed('data_point', true);

  svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category)
      .attr('x', (d) => margins.left + xScale(d.category))
      .attr('y', margins.top)
      .attr('height', 0)
      .attr('width', barWidth)
      .transition()
      .ease(d3.easeLinear)
      .duration((d, i, e) => {
        return 3000 * d.value / 20;
      })
      .attr('height', (d) => yScale(d.value));

  svg
      .selectAll('.data_point')
      .data(dta, (d) => d.category)
      .transition()
      .ease(d3.easeLinear)
      .duration((d) => {
        return 3000 * d.value / 20;
      })
      .attr('height', (d) => yScale(d.value));

  svg
      .selectAll('.graph-x-axis')
      .transition()
      .duration(1000)
      .attr('transform', `translate(${yAxisOffset}, 20)`)
      .call(xAxis);


  svg
      .selectAll('.graph-y-axis')
      .transition()
      .duration(1000)
      .call(yAxis);

  svg
      .selectAll('.graph-y-axis')
      .selectAll('.tick')
      .selectAll('line')
      .attr('opacity', 0.2);
}
