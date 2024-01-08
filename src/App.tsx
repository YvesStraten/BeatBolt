import { useState } from "react";
import "./App.css";
import Form from "./components/Form";

const App = () => {

	const [ytLinks, setYtLinks] = useState<String[]>([]);
	const [spotLinks, setSpotLinks] = useState<String[]>([]);

	const [mode, setMode] = useState<String>("spot");

	return (
		<>
			<div id="main_container">
				<div className={mode === "spot" ? "selector selected" : "selector"} onClick={() => setMode("spot")}>
					<h1>SpotDL</h1>
				</div>
				<div className={mode === "yt" ? "selector selected" : "selector"} onClick={() => setMode("yt")}>
					<h1 >Yt-dlp</h1>
				</div>

			</div>

			<div className="input">
				{mode === "spot" ?
					<Form Links={spotLinks} setLinks={setSpotLinks} mode={mode} /> : <Form Links={ytLinks} setLinks={setYtLinks} mode={mode} />}
			</div>
		</>
	)
}

export default App;
