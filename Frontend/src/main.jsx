import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ClaimSuccess from './modal/ClaimSuccess';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/claim-success" element={<ClaimSuccess />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
