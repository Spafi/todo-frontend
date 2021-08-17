import React from 'react';

const ToDo = ({ item, onDelete, onComplete }) => {
	const backgroundColor = (type) => {
		switch (type) {
			case 'HOME':
				return 'bg-yellow-100';
			case 'WORK':
				return 'bg-blue-100';
			case 'HOBBY':
				return 'bg-green-100';
			default:
				return '';
		}
	};

	const handleCompletion = () => {
		onDelete(item.id)
	}

	return (
		<div
			className={`${
				item.timeRemaining != null && item.timeRemaining <= 1 && 'border-red-700'
			} border w-full p-1 grid grid-cols-6 rounded-md gap-x-4 shadow-sm`}>
			<div className='col-span-5 relative'>
				<p
					className={`${backgroundColor(
						item.type
					)} rounded-md font-bold text-xl relative pr-10 p-2`}>
					{item.name}
					<span className='p-1 text-xs absolute right-0 top-0 text-gray-600'>
						{item.type}
					</span>
				</p>
				<div className='pt-4 pl-2 pb-8 space-y-2'>
					<p>Estimated completion time: {item.durationEstimate} days</p>
					{item.completed && (
						<p>Effective time spent on task: {item.actualWorkedTime} days</p>
					)}
				</div>
				<div className='flex justify-between p-2'>
					<p>Created: {item.createdAt}</p>
					<p> Due date: {item.expirationDate}</p>
					{item.timeRemaining !== null && (
						<p>
							{' '}
							Remaining:{' '}
							{item.timeRemaining <= 1 ? (
								<span className='text-red-700'>{item.timeRemaining} day</span>
							) : (
								<span>{item.timeRemaining} {item.timeRemaining === 1 ? 'day' : 'days'}</span>
							)}
						</p>
					)}
					{item.finishedAt && <p> Finished: {item.finishedAt}</p>}
				</div>
			</div>
			<div className='flex flex-col justify-between py-2'>
				{item.completed ? (
					<p className={`rounded-md bg-green-400 p-1`}>Completed</p>
				) : (
					<>
						<button
							onClick={() => onComplete(item.id)}
							className={`rounded-md bg-blue-300 p-1 hover:bg-blue-500`}>
							Complete
						</button>
						<button
							onClick={() => handleCompletion(item.id)}
							className='rounded-md bg-red-300 p-1 hover:bg-red-500'>
							Delete
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ToDo;
