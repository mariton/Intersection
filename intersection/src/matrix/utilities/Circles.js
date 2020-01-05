import  'd3-selection';
import 'd3-force';

import * as d3 from 'd3'
import d3Tip from 'd3-tip';

import { tip} from '../functions';

class Circles {
  constructor(chart, data, scales, dims){
    this.chart = chart;
    this.dims = dims;
    this.scales = scales;
    this.updateData(data);
  };

  updateData=(newData, dims)=>{
    this.data = newData;
    this.dims = dims;

    this.allCircles =
    this.chart.append('g')
                .attr('class', 'marks')
                .selectAll('.myCircle').data(this.data);
    
    this.allCircles
        .attr('cx', (d,i)=>this.scales.xScale(d.x,d.y)-i)
        .attr('cy', (d,i)=>this.scales.yScale(d.y)-i)
        .attr('fill', (d) => d.color)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
    this.enter();
  };
  enter=()=>{

    this.allCircles.enter()
        .append('circle')
        .attr('class', 'myCircle')
        .attr('cx', (d,i)=>this.scales.xScale(d.x,d.y) -i)
        .attr('cy', (d, i)=>this.scales.yScale(d.y) -i)
        .attr('r', (d) => this.scales.rScale(d.value))
        .attr('fill', (d) => d.color)
        .attr("opacity", 0.8)
        .call(tip)
        .on("mouseover", tip.show)
        .on('mouseout', tip.hide)

        
    this.exit();
  };
  exit=()=>{
    this.allCircles.exit().remove();
  };
  updateScales=(newScales, dims)=>{
    this.dims = dims;
    this.scales = newScales;


    this.allCircles =
      this.chart.selectAll('.myCircle')
          .attr('cx', (d,i)=>this.scales.xScale(d.x,d.y)-i)
          .attr('cy', (d,i)=>this.scales.yScale(d.y)-i)
          .attr('r', (d) =>  this.scales.rScale(d.value))
  };
};
export default Circles;