import { select } from 'd3-selection';
import { Dimensions, Scales, Axes } from './utilities';
import Circles from './Circles';

class ThePattern {
  constructor(domNodeCurrent){
    this.svg = select(domNodeCurrent).append('svg');
    this.svg.attr('width', '100%').attr('height', '100%');
  };
  init=(data, dims)=>{
    this.data = data;
    this.dims = new Dimensions(dims); 
    this.chart = this.svg.append('g');
    this.chart.attr('transform', `translate(${this.dims.margin.left}, ${this.dims.margin.top})`);
    this.scales = new Scales(this.data, this.dims);//
    this.axes = new Axes(this.chart, this.scales, this.dims);
    //this.circles = new Circles(this.chart, this.data, this.scales);
  // this.updateData(data);//<--- commented out; now redundant!!
  };
  updateData=(data)=>{
    //this.circles.updateData(data)
  };
  updateDims=(dims)=>{
    this.dims.setDims(dims);
    this.scales.setScales(this.data, this.dims);
    this.axes.updateAxes(this.scales, this.dims);
   // this.circles.updateScales(this.scales);
  };
};
export default ThePattern;