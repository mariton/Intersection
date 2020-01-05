import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

class Circles {
  constructor(chart, data, scales){
    this.chart = chart;
    this.scales = scales;
    this.updateData(data);
  };
  updateData=(newData)=>{
    this.data = newData;
    this.allCircles =
      this.chart.selectAll('.myCircle').data(this.data);
    this.allCircles.transition().duration(1000)
        .attr('cx', (d,i)=>this.scales.xScale(i))
        .attr('cy', (d)=>this.scales.yScale(d))
        .attr('fill', 'orange')
    this.enter();
  };
  enter=()=>{
    this.allCircles.enter()
      .append('circle')
        .attr('class', 'myCircle')
        .attr('cx', (d,i)=>this.scales.xScale(i))
        .attr('cy', (d)=>this.scales.yScale(d))
        .attr('r', 10)
        .attr('fill', 'green')
    this.exit();
  };
  exit=()=>{
    this.allCircles.exit().remove();
  };
  updateScales=(newScales)=>{
    this.scales = newScales;
    this.allCircles =
      this.chart.selectAll('.myCircle')
        .transition().duration(500)
          .attr('cx', (d,i)=>this.scales.xScale(i))
          .attr('cy', (d)=>this.scales.yScale(d))
  };
};
export default Circles;