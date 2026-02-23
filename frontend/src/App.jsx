//Libraries
import { useContext } from "react";
import { AppContext } from "./Context";
import { Routes, Route } from "react-router-dom";
//CSS
import "./tailwind.css";
//Pages
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
	const { isLogged } = useContext(AppContext);
	return (
		<Routes>
			{!isLogged ? (
				<Route
					path="/"
					element={
						<div className="h-full bg-white dark:bg-gray-900">
							<Login />
						</div>
					}
				/>
			) : (
				<Route path="/" element={<Home />} />
			)}
		</Routes>
	);
}

export default App;
