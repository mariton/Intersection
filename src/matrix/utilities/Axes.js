import React from 'react';
import { axisBottom, axisLeft } from 'd3-axis';


class Axes {
  constructor(parent, scales, dims, options){
    this.parent = parent;
    this.createAxes(parent, scales, dims, options);
  };
  createAxes=(parent, scales, dims, options)=>{
    this.scaleAxes(scales, dims);
    var xbandSize = scales.xScale.bandwidth();
    var ybandSize = scales.yScale.bandwidth();


    this.xAxisBottomG =
      this.parent.append('g')
        .attr('transform', `translate(0, ${dims.innerHeight - ybandSize})`)
        .call(this.xAxisBottom)
         .selectAll("text")
         .style("text-anchor", "middle")
         .attr("transform", "translate(" + -xbandSize/2 + ", 0)");


    this.yAxisLeftG =
      this.parent.append('g')
      .call(this.yAxisLeft)
      .selectAll("text")
         .style("text-anchor", "end")
         .attr("transform", "translate(" + -ybandSize/2 + ", 0)");
  };
  scaleAxes=(scales, dims)=>{
    var xbandSize = scales.xScale.bandwidth();
    var ybandSize = scales.yScale.bandwidth();


    this.xAxisBottom =
      axisBottom()
        .scale(scales.xScale)
        .tickSize(-dims.innerHeight +ybandSize)
        .tickPadding(20);
         
    
    this.yAxisLeft =
      axisLeft()
        .scale(scales.yScale)
        .tickSize(-dims.innerWidth + xbandSize)
        .tickPadding(20);

  };
  exit=()=>{
    this.parent.selectAll('.xAxis').remove();
    this.parent.selectAll('.yAxis').remove();
    this.parent.selectAll('line').remove();
    this.parent.selectAll('path').remove();
    this.parent.selectAll('.tick text').remove();
  };
  updateAxes=(scales, dims)=>{
    this.scaleAxes(scales, dims);
    var xbandSize = scales.xScale.bandwidth();
    var ybandSize = scales.yScale.bandwidth();
    
    this.xAxisBottomG = this.parent.append('g')
      .attr('transform', `translate(0, ${dims.innerHeight - ybandSize})`)
      .attr('class', 'xAxis')
      .call(this.xAxisBottom)
      .selectAll("text")
         .style("text-anchor", "middle")
         .attr("transform", "translate(" + -xbandSize/2 + " ,0)");


    this.yAxisLeftG = this.parent.append('g')
      .attr('class', 'yAxis')
      .call(this.yAxisLeft)
      .selectAll("text")
         .style("text-anchor", "end")
         .attr("transform", "translate(0, " + -ybandSize/2 + ")");

  };
};
export default Axes;