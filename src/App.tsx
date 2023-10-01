import React from 'react';
import Employees from './components/employees/Employees';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<div className="App">
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<Employees />
		</div>
	);
}

export default App;
