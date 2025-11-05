import { useRoutes } from "react-router";
import "./App.css";
import Dashboard from "./components/Dashboard";
import WorkDetail from "./components/WorkDetail";

function App() {
	let element = useRoutes([
		{
			path: "/",
			element: <Dashboard />,
		},
		{ path: "/works/:title", element: <WorkDetail /> },
	]);

	return element;
	// return <Dashboard />;
}

export default App;
