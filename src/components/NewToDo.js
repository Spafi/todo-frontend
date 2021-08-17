import React, { useRef } from 'react';
const NewToDo = ({ toDo, types, onUpdate, onSave }) => {
	const dateRef = useRef();
	const estimationRef = useRef();

	const setDate = (dateString) => {
		const dateContainer = dateRef.current;
		const dateInput = dateContainer.children[1];
		const dateError = dateContainer.lastChild;
		const today = new Date();

		today.setHours(0, 0, 0);

		if (new Date(dateString) < today) {
			dateInput.classList.add('border-red-500');
			dateError.classList.remove('hidden');
			return;
		}

		dateInput.classList.remove('border-red-500');
		dateError.classList.add('hidden');
		onUpdate('expirationDate', dateString);
	};

	const setEstimation = (estimation) => {
		const estimationContainer = estimationRef.current;
		const estimationInput = estimationContainer.children[1];
		const estimationError = estimationContainer.lastChild;

		if (estimation < 0) {
			estimationInput.classList.add('border-red-500');
			estimationError.classList.remove('hidden');
			return;
		}

    if (estimation > 365) estimation = 365
    
		estimationInput.classList.remove('border-red-500');
		estimationError.classList.add('hidden');

		onUpdate('durationEstimate', estimation);
	};
	return (
		<div className='border w-full p-1 rounded-md shadow-sm grid grid-cols-6 gap-4'>
			<div className='col-span-5 flex flex-col'>
				{' '}
				<input
					type='text'
					className='rounded-md font-bold text-xl w-full p-2 border'
					placeholder='Task name'
					value={toDo.name ?? ''}
					onChange={({ target }) => onUpdate('name', target.value)}></input>
				<div className='p-2 pt-4 space-x-4'>
					<label htmlFor='type'>Type</label>
					<select
						name='type'
						className='border rounded-md'
						onChange={({ target }) => onUpdate('type', target.value)}>
						{Object.values(types).map((value) => (
							<option value={value} key={value}>
								{value}
							</option>
						))}
					</select>
				</div>
				<div ref={dateRef} className='px-2 pt-4 space-x-4 flex'>
					<label htmlFor='expiry'>Due date</label>
					<input
						name='expiry'
						type='date'
						className='border rounded-md outline-none'
						value={toDo.expirationDate ?? ''}
						onChange={({ target }) => setDate(target.value)}></input>
					<p className='hidden text-sm text-red-700'>
						Due date can't be in the past!
					</p>
				</div>
				<div
					ref={estimationRef}
					className='px-2 pt-4 space-x-4 mb-6 flex items-center relative'>
					<label htmlFor='estimation'>
						Task period estimation <br /> (0 for same day completion)
					</label>
					<input
						name='estimation'
						type='number'
						min='0'
						max='365'
						className='border rounded-md outline-none h-10'
						value={toDo.durationEstimate}
						onChange={({ target }) => setEstimation(target.value)}></input>
					<div className='hidden absolute text-sm text-red-700 right-0'>
						Estimation can't be negative!
					</div>
				</div>
			</div>
			<div className='flex flex-col justify-between py-2'>
				<button
					onClick={() => onSave()}
					className={`rounded-md bg-green-400 p-1 hover:bg-green-500`}>
					Save
				</button>
			</div>
		</div>
	);
};

export default NewToDo;
