import * as d3 from 'd3';
import {generateData} from './utils.js';
import {initializeGraphic, renderBarchart} from './render_barchart.js';

const margins = {top: 30, bottom: 50, left: 70, right: 50};

const svgHeight = 600 - margins.top - margins.bottom;
const svgWidth = 600 - margins.left - margins.right;

initializeGraphic(svgHeight, svgWidth, margins);

d3.select('#thebutton')
    .on('click', () => renderBarchart(generateData(), svgHeight, svgWidth, margins));


