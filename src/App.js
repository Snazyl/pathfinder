import React, { useEffect } from 'react';
import logo from './logo.svg';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import { Modal, Button } from 'react-materialize';


function App() {
	useEffect(() => {
		let elems = document.querySelectorAll('.dropdown-trigger');
		M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
	}, [])
	return (
		<div className="App">
			<PathfindingVisualizer>a</PathfindingVisualizer>
		</div>
	);
}

export default App;
