import React from 'react';

const SortButton = ({ name, clickHandler, direction, column, currentSort }) => {
	return (
		<button
			className='border-2 rounded-md px-2 py-1 flex w-40'
			onClick={() => typeof clickHandler === 'function' && clickHandler()}>
			<p className='w-28 '>{name}</p>
			<div
				className={`w-5 h-max flex justify-center items-center transform ${
					direction === 'DESC'
						? '-rotate-90 inline-flex'
						: direction === 'ASC'
						? 'rotate-90 inline-flex'
						: ''
				} 
        ${column !== currentSort && 'hidden'}`}>
				&#10151;
			</div>
		</button>
	);
};

export default SortButton;
