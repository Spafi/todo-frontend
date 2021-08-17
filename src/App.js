import './App.css';
import ToDoContainer from './components/ToDoContainer';

function App() {
	return (
		<div className='App'>
			<main className='relative border-2 '>
				{/* START USERNAME CONTAINER */}
				<div className='grid grid-cols-2 p-2 text-xl'>
					<div className='col-start-2'>
						<p>User Name</p>
					</div>
				</div>
				{/* END USERNAME CONTAINER */}
				<ToDoContainer/>
			</main>
		</div>
	);
}

export default App;
