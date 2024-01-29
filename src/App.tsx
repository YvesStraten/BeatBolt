import { useState } from "react";
import "./App.scss";
import Form from "./components/Form";
import Queue from "./components/Queue";
import "./assets/strasua.otf";

const App = () => {
	const [Links, setLinks] = useState<string[]>([]);

	const [queueOpen, queueToggle] = useState<boolean>(false);

	const selectors = ["SPOTIFY", "YOUTUBE", "QUEUE"];

	return (
		<>
			<div id="main_title">
				<h1>BEAT BOLT</h1>
			</div>
			<div id="main_container">
				<div>
					{selectors.map((selector) => (
						<h1
							className="selector"
							onClick={() => {
								if (queueOpen) {
									queueToggle(false);
								} else {
									queueToggle(true);
								}
							}}
						>
							{selector}
						</h1>
					))}
				</div>
			</div>

			{queueOpen === true ? (
				<Queue Links={Links} setLinks={setLinks} />
			) : (
				<Form Links={Links} setLinks={setLinks} />
			)}
		</>
	);
};

export default App;
