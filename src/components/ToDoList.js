import React, { useState, useEffect } from 'react';
import ToDo from './ToDo';
import axios from 'axios';
import { TODO_URL } from '../BASE_URL';
import SortButton from './SortButton';
import NewToDo from './NewToDo';

const ToDoList = () => {
	const directions = { ASC: 'ASC', DESC: 'DESC' };
	const columnNames = { CREATE: 'createdAt', EXPIRE: 'expirationDate' };
	const taskType = { HOME: 'Home', WORK: 'Work', HOBBY: 'Hobby' };
  const emptyToDo = {
			name: '',
			expirationDate: null,
			durationEstimate: 0,
			type: taskType.HOME,
		};
	const [toDos, setToDos] = useState([]);
	const [sortDirection, setSortDirection] = useState(directions.ASC);
	const [columnName, setColumnName] = useState(columnNames.CREATE);
  const [showNewToDo, setShowNewToDo] = useState(false)
	const [newToDo, setNewToDo] = useState(emptyToDo);

	const updateNewToDo = (key, value) => {
		const updatedToDo = { ...newToDo, [key]: value };
		setNewToDo(updatedToDo);
	};

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
			})
			.catch((error) => console.log(error));
	};

	const deleteTask = async (taskId) => {
		await axios
			.delete(TODO_URL + '/' + taskId)
			.then(() => {
				const newToDos = toDos.filter((item) => item.id !== taskId);
				setToDos(newToDos);
			})
			.catch((error) => console.log(error));
	};

	const completeTask = async (taskId) => {
		await axios
			.put(TODO_URL + '/' + taskId)
			.then(() => {
				getItems(sortDirection, columnName);
			})
			.catch((error) => console.log(error));
	};

	const saveTask = async () => {
		if (newToDo.expirationDate == null)
			return alert('Please select task expiration date!');
      setShowNewToDo(false)
      setNewToDo(emptyToDo)
		await axios
			.post(TODO_URL, newToDo)
			.then(() => {
				getItems(sortDirection, columnName);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getItems(sortDirection, columnName);
	}, [sortDirection, columnName]);

	return (
		<div className='border w-40rem p-4 space-y-4 flex flex-col items-center rounded-md shadow-md'>
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
				<ToDo
					key={item.id}
					item={item}
					onDelete={deleteTask}
					onComplete={completeTask}
				/>
			))}
			{showNewToDo === true ? (
				<NewToDo
					toDo={newToDo}
					types={taskType}
					onUpdate={updateNewToDo}
					onSave={saveTask}
				/>
			) : (
				<button
					onClick={() => setShowNewToDo(true)}
					className='rounded-md text-xl border-2 p-2 bg-green-400 hover:bg-green-500'>
					Add task
				</button>
			)}
		</div>
	);
};

export default ToDoList;
