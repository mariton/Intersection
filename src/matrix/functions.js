import * as R from 'ramda';
import * as d3 from 'd3'
import d3Tip from 'd3-tip';


export const defaultColorObj = {
		intersection:'#fff459',
		mark:'#42d7f5'
	};

export const xAxis = (items) => {
	const xScaleKey = 'x';

	const getXLabels = R.pipe(
		R.flatten,
		R.sortBy(R.prop(xScaleKey)),
		R.map(R.prop(xScaleKey)),
		R.uniq
		)

	const xLabels = getXLabels(items);
	return xLabels;
};
export const yAxis = (items) => {

	const getYLabels = R.pipe(
		R.flatten,
		R.uniq
		)

	const yLabels = getYLabels(items);
	return yLabels.sort();
};

export const normalize = R.pipe(
  R.unnest,
  R.map(({items, y, color, label}) => {
    return R.map(R.pipe(
    	R.assoc('y', y),
    	R.assoc('color', color),
    	R.assoc('label', label)
    ), items)
  }),
  R.unnest
);

export const getDatasource = (dataRaw) => {
		return dataRaw.map(ds => (ds.data))
};

export const setAttributes = R.pipe(
	R.map(({data, color, label}) => {
		return R.map(R.pipe(
				R.assoc('color', (color!==undefined)?color:defaultColorObj.mark),
				R.assoc('label', label)), data)
		}
	),
	R.unnest
);

export const setLegendAttributes = (dataRaw, category) => {
		var legendData = [];
		dataRaw.map(row => {legendData.push(R.pick([category, 'color'], row));});
		return legendData;
};

export const intersections =(circlesData)=> R.pipe(
	    	R.groupBy(({y, x}) => (y + x)),
	    	R.filter(R.compose(R.lt(1), R.length)),
	    	R.mapObjIndexed((arr) => {
	    		const s = R.sum(R.map(R.prop('value'), arr))
	    		return R.map(R.assoc('total', s), arr)
	    	}),
	    	R.values
		)(circlesData);

export const defaultColor=(color, location) =>{
		var colorObj = {[location]: color};
		return  (color!==undefined)?colorObj:defaultColorObj;
};

export const tip = d3Tip().attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
  	var total = (d.value!==undefined)?d.value:d.total;
  	var title = (d.title!==undefined)?d.title:"Quantity on size " + d.y+d.x +" for " + d.label;

    return "<div class='d3-tip'>" +
    		"<p>" + title + "</p>" +
            "<table>" +
            "<tr style='width:100%'><th  style='width:20%'>Size</th><th  style='width:80%'>Quantity</th></tr>" +
            "<tr><td>"+ d.y + d.x +"</td><td style='width:30%'>" + total+ "</td></tr>" +
            "</table>" +
            "</div>" ;
  });

  export const getUniqValues =(data) => R.pipe(
		R.map((arr)=>{return R.pickAll(['x','y','color','total', 'title'], arr)}),
		R.uniq,
  		R.values
  	)(data);
