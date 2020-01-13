import { scalePoint, scaleBand, scaleLinear } from 'd3-scale';
import { min, max } from 'd3';

class Scales {
  constructor(xLabels,yLabels, dims, values){
    
    this.setScales(xLabels,yLabels, dims);
    this.setRadiusScale(values);
  };
  setScales=(xLabels,yLabels, dims)=>{
    this.xScale = scaleBand()
        .domain(xLabels)
        .range([0,dims.innerWidth])
        .paddingOuter(0.5)

    this.yScale = scaleBand()
        .domain(yLabels)
        .range([0,dims.innerHeight])
        .paddingOuter(0.5)

  };
  setRadiusScale=(values)=>{
    this.rScale = scaleLinear()
        .domain([0,1, max(values)])
        .range([0, 3, 20])
        .nice();

  };
};
export default Scales;