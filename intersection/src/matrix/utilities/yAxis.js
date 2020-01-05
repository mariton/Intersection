import React from 'react';

class YAxis extends React.Component {
	render()
	{
		return (
			<div className={this.props["className"]}>{this.props.item}</div>
			);
	};
};

export default YAxis;