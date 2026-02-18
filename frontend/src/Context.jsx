import { createContext, useState } from "react";
import App from "./App";

export const URL = "http://localhost:3000";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const ContextProvider = () => {
	const [isLogged, setIsLogged] = useState(true);

	return (
		<AppContext.Provider
			value={{
				isLogged,
				setIsLogged,
			}}>
			<App />
		</AppContext.Provider>
	);
};

export default ContextProvider;
