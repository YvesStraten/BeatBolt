import { useState } from "react";
import "./App.scss";
import Form from "./components/Form";
import Queue from "./components/Queue";
import "./assets/Inter-VariableFont_slnt,wght.ttf"
import "./assets/sf-ui-display-bold-58646a511e3d9.otf"

const App = () => {

	const [Links, setLinks] = useState<string[]>([]);

	const [mode, setMode] = useState<string>("spot");
	const [selected, setSelected] = useState<string>("");

	const selectHandler = (selector: string) => {
		switch (selector) {
			case "spot":
				setMode("spot");
				setSelected("spot");
				break;

			case "yt":
				setMode("yt");
				setSelected("yt");
				break;

			case "queue":
				setSelected("queue")
				break;
		}

	}
	return (
		<>
			<h1 id="main_title">BEAT BOLT</h1>
			<nav>
				<div id="main_container">
					<div className={selected === "spot" ? "selector selected" : "selector"} onClick={() => selectHandler("spot")}>
						<h1>SPOTDL</h1>
					</div>
					<div className={selected === "yt" ? "selector selected" : "selector"} onClick={() => selectHandler("yt")}>
						<h1 >YT-DLP</h1>
					</div>

					<div className={selected === "queue" ? "selector selected" : "selector"} onClick={() => selectHandler("queue")}>
						<h1>QUEUE</h1>
					</div>
				</div>
			</nav>
			<hr id="rule" />

			{selected === "queue" ? <Queue Links={Links} setLinks={setLinks} mode={mode} /> : <Form Links={Links} setLinks={setLinks} mode={mode} />}

		</>
	)
}

export default App;
