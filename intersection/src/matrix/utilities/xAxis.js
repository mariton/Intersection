import React from 'react';

class XAxis extends React.Component {
	render()
	{
		return (
			<div className={this.props["className"]}>{this.props.item}</div>
			);
	};
};

export default XAxis;