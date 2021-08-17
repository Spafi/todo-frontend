import React, { useState, useEffect } from 'react';
import ToDo from './ToDo';
import axios from 'axios';
import { TODO_URL } from '../BASE_URL';

const ToDoList = () => {
	const [toDos, setToDos] = useState([]);

	const getItems = async (sortDirection, columnName) => {
		await axios
			.get(TODO_URL, { params: { sortDirection, columnName } })
			.then((response) => {
        console.log(response.data);
				setToDos(response.data);
			});
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<div className='border w-40rem p-4 space-y-4 flex flex-col items-center rounded-md'>
			<div className='w-full'>Sort</div>
      {toDos.map(item => <ToDo key={item.id} item={item}/>)}
		</div>
	);
};

export default ToDoList;
