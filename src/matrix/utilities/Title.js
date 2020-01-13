
class Title {
	constructor(chart, options, dims) {
		this.chart = chart;
		this.options = options;
		this.init(dims);
	};

	init = (dims) => {
		this.chart.append('g')
		.attr('class', 'titleG')
		.append('text')
		.attr("x", (dims.innerWidth / 2))             
        .attr("y", 0 - (dims.margin.top /2))
        .attr("class", 'title')
        .style("fill", this.options.fontColor)
		.text(this.options.title);
	};
}

export default Title;