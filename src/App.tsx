import { useState } from "react";
import "./App.scss";
import Form from "./components/Form";
import Queue from "./components/Queue";
import "./assets/Inter-VariableFont_slnt,wght.ttf";
import "./assets/sf-ui-display-bold-58646a511e3d9.otf";

const App = () => {
	const [Links, setLinks] = useState<string[]>([]);

	const [selected, setSelected] = useState<string>("");

	return (
		<>
			<div id="main_title">
				<h1>BEAT BOLT</h1>
			</div>
			<div id="main_container">
				<div>
					<h1>SPOTIFY</h1>
					<h1>YOUTUBE</h1>
					<h1 onClick={() => setSelected("queue")}>QUEUE</h1>
				</div>
			</div>

			{selected === "queue" ? (
				<Queue Links={Links} setLinks={setLinks} />
			) : (
				<Form Links={Links} setLinks={setLinks} />
			)}
		</>
	);
};

export default App;
