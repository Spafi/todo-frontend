import React, { useState, useEffect } from 'react';
import ToDo from './ToDo';
import axios from 'axios';
import { TODO_URL } from '../BASE_URL';
import SortButton from './SortButton';

const ToDoList = () => {
	const directions = { ASC: 'ASC', DESC: 'DESC' };
	const columnNames = { CREATE: 'createdAt', EXPIRE: 'expirationDate' };

	const [toDos, setToDos] = useState([]);
	const [sortDirection, setSortDirection] = useState(directions.ASC);
	const [columnName, setColumnName] = useState('createdAt');

	const changeSortDirection = () => {
		if (sortDirection === directions.ASC) setSortDirection(directions.DESC);
		if (sortDirection === directions.DESC) setSortDirection(directions.ASC);
	};

	const sortData = (columnName) => {
		setColumnName(columnName);
		changeSortDirection();
	};

	const getItems = async (sortDirection, columnName) => {
		await axios
			.get(TODO_URL, { params: { sortDirection, columnName } })
			.then((response) => {
				setToDos(response.data);
			});
	};

	useEffect(() => {
		getItems(sortDirection, columnName);
	}, [sortDirection, columnName]);

	return (
		<div className='border w-40rem p-4 space-y-4 flex flex-col items-center rounded-md border-green-900'>
			<div className='w-full flex justify-end gap-4 items-center'>
				<p>Sort by:</p>{' '}
				<SortButton
					name={'Creation Date'}
					column={columnNames.CREATE}
					currentSort={columnName}
					direction={sortDirection}
					clickHandler={() => sortData(columnNames.CREATE)}
				/>
				<SortButton
					name={'Expiry Date'}
					column={columnNames.EXPIRE}
					currentSort={columnName}
					direction={sortDirection}
					clickHandler={() => sortData(columnNames.EXPIRE)}></SortButton>
			</div>
			{toDos.map((item) => (
				<ToDo key={item.id} item={item} />
			))}
			<button className='rounded-md text-xl border-2'>Add task</button>
		</div>
	);
};

export default ToDoList;
