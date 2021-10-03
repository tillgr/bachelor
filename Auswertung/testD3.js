import * as d3 from 'd3';


let color = d3.scaleThreshold()
    .domain([0, 1])
    .range([0,1]);

console.log(color(-0.1))

