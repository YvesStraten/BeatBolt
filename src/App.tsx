import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Queue from "./components/Queue";

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
			<nav>
				<div id="main_container">
					<div className={selected === "spot" ? "selector selected" : "selector"} onClick={() => selectHandler("spot")}>
						<h1>SpotDL</h1>
					</div>
					<div className={selected === "yt" ? "selector selected" : "selector"} onClick={() => selectHandler("yt")}>
						<h1 >Yt-dlp</h1>
					</div>

					<div className={selected === "queue" ? "selector selected" : "selector"} onClick={() => selectHandler("queue")}>
						<h1>Queue</h1>
					</div>
				</div>
			</nav>
			<hr id="rule" />

			{selected === "queue" ? <Queue Links={Links} setLinks={setLinks} mode={mode} /> : <Form Links={Links} setLinks={setLinks} mode={mode} />}

		</>
	)
}

export default App;
