import { useContext } from "react";
import Login from "./Components/Login";
import { AppContext } from "./Context";
import "./tailwind.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";

function App() {
	const { isLogged } = useContext(AppContext);
	return (
		<>
			{!isLogged ? (
				<div className="h-full bg-white dark:bg-gray-900">
					<Login />
				</div>
			) : (
				<div>
					<Navbar />
					<Home />
				</div>
			)}
		</>
	);
}

export default App;
