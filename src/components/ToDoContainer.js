import React from 'react';
import ToDoList from './ToDoList';

const ToDoContainer = () => {
	return (
		<div className='flex border-2 border-red-800 items-center justify-center py-16 flex-col'>
			<h1 className='text-5xl text-center'>My To-Do list</h1>
      <ToDoList/>
		</div>
	);
};

export default ToDoContainer;
