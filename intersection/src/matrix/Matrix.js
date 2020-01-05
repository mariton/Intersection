import React from 'react';
import { select } from 'd3-selection';
import { Dimensions, Scales, Axes, Circles,Intersection, Title} from './utilities';
import Legend from './Legend';

import { getDatasource, xAxis, yAxis, setAttributes, normalize, intersections, setLegendAttributes,defaultColor, getUniqValues}  from './functions';
import * as R from 'ramda';


class Matrix extends React.Component {
	constructor(domNodeCurrent, options) {
		super(domNodeCurrent, options);
		this.options = options;
		this.svg = select(domNodeCurrent).append('svg');
    	this.svg.attr('width', '100%').attr('height', '100%');
	};
	init=(data, dims)=>{
	    this.data = data;
	    //set chart dimensions
	    this.dims = new Dimensions(dims);
	    
	    //create chart 
	    this.chart = this.svg.append('g');
	    this.chart.attr('transform', `translate(${this.dims.margin.left}, ${this.dims.margin.top})`);

	    //add Title to chart
	    this.title = new Title(this.chart, this.options.titleSettings, this.dims);
   

	    //get xLabels and yLabels from data
	    const dsItems = getDatasource(this.data);
	   	this.xLabels = xAxis(dsItems.map(row => (row.map(rowItems => (rowItems.items)))));
	   	this.yLabels = yAxis(dsItems.map(row => (row.map(rowItems => (rowItems.y)))));

	   	//set colors for different products
	   	var dsItemsWcolors = setAttributes(data);

	   	
	   	//draw Circles/Squares of data
	    var circlesData = (dsItemsWcolors !== undefined)?normalize(dsItemsWcolors):normalize(dsItems);
	    this.valuesRadius = circlesData.map(row => row.value)

	    //set scales from data, xLabels and yLabels
	    this.scales = new Scales(this.xLabels, this.yLabels, this.dims, this.valuesRadius);
	    //Add Axis to chart
	    this.axes = new Axes(this.chart, this.scales, this.dims, this.options.chartSettings);    

	   
	    //draw Intersections of data
	    var intersectionData = R.pipe(
	    		R.unnest,
	    		R.map(row=> R.assoc('color', defaultColor(this.options.legendSettings.colorIntersection, 'intersection').intersection,row)),
	    		R.map(row => R.assoc('title', this.options.tooltipSettings.title, row))
	    		,R.values
	    	)(intersections(circlesData));
	    
	    this.intersections = new Intersection(this.chart, getUniqValues(intersectionData), this.scales, this.dims);

	    //add data points
	    this.circles = new Circles(this.chart, circlesData, this.scales, this.dims);	


	     //add Legend to chart
	    var legendData = setLegendAttributes(this.data, this.options.legendSettings.category);

	    if(this.options.legendSettings.visible)
	   		this.legend = new Legend(this.chart, this.options.legendSettings, this.dims, legendData);  	

	};
	updateData=(data, dims)=>{
    	this.circles.updateData(data, dims);
  	};
  	updateDims=(dims)=>{
	    this.dims.setDims(dims);

	    this.scales.setScales(this.xLabels, this.yLabels, this.dims);
	   	this.axes.exit();
	    this.axes.updateAxes(this.scales, this.dims);


	   	this.intersections.updateScales(this.scales);
	    this.circles.updateScales(this.scales, this.dims);
	    this.legend.updateScales(this.scales, this.dims);
	 };
};
export default Matrix;