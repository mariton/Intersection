import React from 'react';
import { Circles, Intersection, Dimensions } from './utilities';
import { defaultColor,defaultColorObj}  from './functions';

class Legend extends React.Component{
	constructor(chart, options, dims, data, scales) {
		super(chart, options);
		this.chart = chart;
		this.options = options;
		this.dims = dims;
		this.scales = scales;
		this.dimLegend = new Dimensions({width:this.options.width, height:this.options.height});

		//Set position for Legend, only right with top and bottom alignment
		var legendPosition = this.setPosition();
		console.log("legendPosition",legendPosition)

		//Create G group for Legend
		this.legend = this.chart.append('g').attr('transform', `translate(${legendPosition.innerWidth}, ${legendPosition.innerHeight})`)
			.attr('class', 'legend')
			.style('width', this.options.width)
			.style('height', this.options.height)
			.style('float', 'left');

		//Add legend Title	
		this.legend.append('text')
	        .text(this.options.title)
	        .attr('x', 5)
	        .attr('y', -(this.dimLegend.height))
	        .attr('class', 'legendTitle')
	        .style('fill', this.options.fontColor);


	    //Add Matrix Intersection mark to legend
		var legendIntersectionObj ={};
		legendIntersectionObj[this.options.category] = this.options.labelIntersection;
		legendIntersectionObj['color'] = defaultColor(this.options.colorIntersection, 'intersection').intersection;
		
		if (this.options.showIntersection)
			data.push(legendIntersectionObj);
		this.updateData(data);
	};


	setPosition = () =>{
		let legendPosition = new Dimensions(this.dimLegend);
		if ((this.options.position.toLowerCase() === 'right') && (this.options.align.toLowerCase() === 'bottom'))
		{
			legendPosition.innerWidth = this.dims.innerWidth;
			legendPosition.innerHeight = this.dims.innerHeight;
		}
		else if ((this.options.position.toLowerCase() === 'right') && (this.options.align.toLowerCase() === 'top'))
		{
			legendPosition.innerWidth = this.dims.innerWidth;
			legendPosition.innerHeight = this.dimLegend.height;
		}
		else 
		{
			legendPosition.innerWidth = this.dims.innerWidth;
			legendPosition.innerHeight = this.dims.innerHeight;

		}
		//need to translate charts (0,0) position for the left positioning
		// else if ((this.options.position.toLowerCase() == 'left') && (this.options.align.toLowerCase() == 'bottom'))
		// {
		// 	legendPosition.innerWidth = -this.dimLegend.width;
		// 	legendPosition.innerHeight = this.dims.innerHeight;
		// }
		return legendPosition;
	};

	updateData = (newData) => {
		this.data = newData;

		this.allLegend = this.legend.selectAll('.legendCircle').data(this.data);
		this.allLegend
	        .attr('cx', (d) => {return 10})
	        .attr('cy', (d,i) => {return -this.dimLegend.height + 20 * (i+1)})
	        .attr('fill', (d) => (d.color!==undefined)?d.color:defaultColorObj.mark)
   		this.enter();
	};
	 updateScales=(newScales, dims)=>{
	    this.dims = dims;
	    this.scales = newScales;
	    var legendPosition = this.setPosition();
	    this.legend.attr('transform', `translate(${legendPosition.innerWidth}, ${legendPosition.innerHeight})`)

	};

	enter = () => {
		
		this.allLegend.enter()
	        .append('circle')
	        .attr('class', 'legendCircle')
	        .attr('cx', (d)=> {return 10})
	        .attr('cy', (d, i)=>{return -this.dimLegend.height+ 20*(i+1) })
	        .attr('r', (d) => 7)
	        .attr('fill', (d) => {return (d.color!==undefined)?d.color:defaultColorObj.mark})
	        .attr("opacity", 0.8);

	    this.allLegend.enter().append('text')
	        .text((d) => {return d[this.options.category];})
	        .attr('x', 20)
	        .attr('y', (d, i)=>{return -this.dimLegend.height + 20*(i+1) + 3})
	        .attr('class', 'legendText')
	        .style('fill', this.options.fontColor);

        this.exit();
	};
	exit=()=>{
	    this.allLegend.exit().remove();
	};

}

export default Legend;