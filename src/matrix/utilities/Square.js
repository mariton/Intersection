import React from 'react';

class Square extends React.Component {
	render()
	{
		return (
			<button className={this.props["className"]}>{this.props.item.value}</button>
			);
	};
};

export default Square;