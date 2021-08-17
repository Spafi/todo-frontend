import React, { useRef, useState } from 'react';
const ToDo = ({ item, onDelete, onComplete, updateToDoDuration }) => {
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
	const [completionTime, setCompletionTime] = useState(0);
	const estimationRef = useRef();
	const [toggleCompletion, setToggleCompletion] = useState(false);

	const setCompletion = (duration) => {
		const completionContainer = estimationRef.current;
		const completionInput = completionContainer.children[1];
		const completionError = completionContainer.lastChild;
		if (duration < 0) {
			completionInput.classList.add('border-red-500');
			completionError.classList.remove('hidden');
			return;
		}
		if (duration > 365) duration = 365;

		completionInput.classList.remove('border-red-500');
		completionError.classList.add('hidden');
		setCompletionTime(duration);
	};

	const handleCompletion =  () => {
		if (completionTime === '') {
			return alert('Please set completion time');
		}
		onComplete(item.id, completionTime);
	};

	const formatDays = (days) => {
		return days === 1 ? ' day' : ' days';
	};

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
					<p>
						Estimated completion time: {item.durationEstimate}
						{formatDays(item.durationEstimate)}
					</p>
					{item.completed === true ? (
						<p>
							Effective time spent on task: {item.actualWorkedTime}
							{formatDays(item.actualWorkedTime)}
						</p>
					) : (
						toggleCompletion && (
							<div
								ref={estimationRef}
								className='pt-4 space-x-4 mb-6 flex items-center relative'>
								<label htmlFor='completion'>
									Effective time spent on task <br /> (0 for same day completion)
								</label>
								<input
									name='completion'
									type='number'
									min='0'
									max='365'
									className='border rounded-md outline-none h-10'
									value={completionTime}
									onChange={({ target }) => setCompletion(target.value)}></input>
								<p className='hidden text-sm text-red-700 right-0'>
									Completion time can't
									<br /> be negative!
								</p>
							</div>
						)
					)}
				</div>
				<div className='flex justify-between p-2'>
					<p>Created: {item.createdAt}</p>
					<p> Due date: {item.expirationDate}</p>
					{item.timeRemaining !== null && (
						<p>
							{' '}
							Remaining:{' '}
							{
								<span className={`${item.timeRemaining <= 1 && 'text-red-700'}`}>
									{item.timeRemaining}
									{formatDays(item.timeRemaining)}
								</span>
							}
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
							onClick={() => setToggleCompletion((prevState) => !prevState)}
							className={`rounded-md bg-blue-300 p-1 hover:bg-blue-500`}>
							{toggleCompletion === true ? 'Cancel' : 'Complete'}
						</button>
						{toggleCompletion === true && (
							<button
								onClick={() => handleCompletion()}
								className={`rounded-md bg-green-300 p-1 hover:bg-green-500`}>
								Save
							</button>
						)}
						<button
							onClick={() => onDelete()}
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
