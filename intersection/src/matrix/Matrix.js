import React from 'react';
import { Square , XAxis} from './utilities';
import * as R from 'ramda';

class Matrix extends React.Component {
	constructor(props) {
		super(props);
	};
	init=(data,dims) =>{

	};
	renderSquare(item, className="square") {
		return <Square item={item} className = {className} />;
	};
	renderxAxis(item, className="xAxis") {
		return <XAxis item={item} className = {className} />;
	};
	xAxis(items, className="xAxis") {
		const xScaleKey = 'column';

		const getXLabels = R.compose(
		  R.map(R.prop(xScaleKey)), 
		  R.head, 
		  R.values
		)
		const xLabels = getXLabels({items});
		console.log(xLabels);
		return xLabels;
	};

	render() {
		console.log(this.props.data[0].items)
		return (
			<div className="container">
			{
				this.props.data.map(row => (
					<div className="board-row" key={row.uniqueId}>
						<div className="yAxis">
							{row.rowKey}
						</div>
						{R.map(this.renderSquare, row.items)}
						
					</div>
				))
			}
				<div className="board-row-axis">
					{this.renderSquare([], "squareInvisible")}
					{ 
						R.map(this.renderxAxis, this.xAxis(this.props.data[0].items))
					}
				</div>
			</div>
		)

		
	};
};
export default Matrix;