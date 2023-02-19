import * as d3 from 'd3';
import {generateData} from './utils.js';
import {initializeGraphic, renderBarchart} from './render_barchart.js';

const svgHeight = 500;
const svgWidth = 500;

const margins = {top: 30, bottom: 50, left: 50, right: 50};

initializeGraphic(svgHeight, svgWidth, margins);

d3.select('#thebutton')
    .on('click', () => renderBarchart(generateData(), svgWidth, svgHeight, margins));


