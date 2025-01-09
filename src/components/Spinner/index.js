import React from 'react';
import './spinner.css';

const Spinner = ({ backgroundColor, style }) => {
	const colorStyles = {
		backgroundColor: backgroundColor,
	};

	return (
		<>
			<div className='spinner' style={style ? style : {}}>
				<div className='bounce1' style={colorStyles} />
				<div className='bounce2' style={colorStyles} />
				<div className='bounce3' style={colorStyles} />
			</div>
		</>
	);
};

export default Spinner;
