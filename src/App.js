import './App.css';
import ToDoContainer from './components/ToDoContainer';

function App() {
	return (
		<div className='App'>
			<main className='w-screen h-screen relative'>
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
