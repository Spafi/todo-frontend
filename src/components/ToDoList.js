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
		<div className='rounded-md border'>
			<div>Sort</div>
			<ToDo />
      
		</div>
	);
};

export default ToDoList;
