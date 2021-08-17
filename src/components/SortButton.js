import React from 'react';

const SortButton = ({ name, clickHandler, direction, column, currentSort }) => {
	return (
		<button
			className='border-2 rounded-md px-2 py-1 flex w-40'
			onClick={() => typeof clickHandler === 'function' && clickHandler()}>
			<p className='w-28 '>{name}</p>
			<div
				className={`w-5 h-max flex justify-center items-center transform 
        ${column !== currentSort && 'hidden'}`}>
				{direction === 'DESC' ? (
					<img
						alt=''
						src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAy0lEQVRoge3UzQqCQBSG4XfffZTRJSgS0f3fRWTbDLe2OQcGrfytZuB7QNzomXkZGBARERERERGRwCbSWZOUwA04rjArt1nnFWZNUgIPoLX3kpgcuNushh/GnGzBNnhqoJgxq7B/w1mNrfF1O+DSWXzOyYQnET4VcFhxvx8tjYkiws2NiSrCTY2JMsKNjYk6wg3FJBHh9sCV/mZr+ldsa99mf9npCFten0wSJ9E1FJNEhHsXk1SE68YkGeE8JukIlxHx7SQiIiIikp4n4haKGBduT7EAAAAASUVORK5CYII='
					/>
				) : (
					<img
						alt=''
						src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAwUlEQVRoge3UQQrCMBBG4bf3ICreoJQi4v1vIdWtlW51YQZKaqlpxE7g/yCbFtI8pgREREREROR3dmEVbQtcgBtwWPksi1nEM6wiY+KIImOmIoqKmYsoImYPtIwP3YUVP29xeJtNTeIBHIEKuH9472oycxHGdcy3EcZlTGqEcRWzNMK4iMmNMKvHnIA++ngH1Av2qhlfzX34xl80gwOkTiI2nEwPnLNPl6jh/RvkRJgKuLJChNk43UtERERERESkdC/V54oe6DDRqwAAAABJRU5ErkJggg=='
					/>
				)}
			</div>
		</button>
	);
};

export default SortButton;
