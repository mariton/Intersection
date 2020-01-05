import  'd3-selection';
import 'd3-transition';
import { tip} from '../functions';
import * as R from 'ramda';

class Intersection {
	constructor(chart, data, scales,dims){
	    this.chart = chart;
	    this.scales = scales;
	    this.dims = dims;
	    this.updateData(data);
	};

	enter=()=>{
		//to add ticks step or x values array len instead of the 8 in  this.dims.innerHeight/8
		var xbandSize = this.scales.xScale.bandwidth();
    	var ybandSize = this.scales.yScale.bandwidth();

        this.allIntersection.enter()
			.append('rect')
			.attr('class', 'intersection')
	      	.attr('x', (d,i)=>{return this.scales.xScale(d.x,d.y)- xbandSize/2})
        	.attr('y', (d)=>this.scales.yScale(d.y) - ybandSize/2)
        	.style('width', xbandSize)
        	.style('opacity', 0.8)
        	.attr('height', ybandSize)
        	.attr('fill', (d) => d.color)
        	.call(tip)
	        .on("mouseover", tip.show)
	        .on('mouseout', tip.hide);

	};
	updateData=(newData)=>{
	    this.data = newData;
	    var xbandSize = this.scales.xScale.bandwidth();
    	var ybandSize = this.scales.yScale.bandwidth();

	    this.allIntersection =
	      this.chart.append('g')
                .attr('class', 'intersectionMarks')
	      		.selectAll('.intersection').data(this.data);

	    this.allIntersection
			.attr('x', (d,i)=>{return this.scales.xScale(d.x,d.y)- xbandSize/2})
        	.attr('y', (d)=>this.scales.yScale(d.y) - ybandSize/2)
	        .attr('fill', (d) => d.color)
	        .on('mouseover', tip.show)
        	.on('mouseout', tip.hide)
	    this.enter();
	};
	exit=()=>{
		this.allIntersection.exit().remove();
	};
	updateScales=(newScales)=>{
    
    this.scales = newScales;

    var xbandSize = this.scales.xScale.bandwidth();
    var ybandSize = this.scales.yScale.bandwidth();

    this.allIntersection =
      this.chart.selectAll('.intersection')
        .attr('x', (d,i)=>{return this.scales.xScale(d.x,d.y)- xbandSize/2})
        .attr('y', (d)=>this.scales.yScale(d.y) - ybandSize/2)
        .style('width', xbandSize)
        .attr('height', ybandSize)

  };


}

export default Intersection;