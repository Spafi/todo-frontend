import React from 'react';
import ToDoList from './ToDoList';

const ToDoContainer = () => {
	return (
		<div className='flex items-center justify-center py-16 flex-col space-y-4'>
			<h1 className='text-5xl text-center'>My To-Do list</h1>
      <ToDoList/>
		</div>
	);
};

export default ToDoContainer;
