import { useState } from "react";
import ApplicationDefault from "../types/main";

const Form = ({ Links, setLinks }: ApplicationDefault) => {
	const [input, setInput] = useState<string>("");

	const updateInput = (event: string) => {
		console.log(event);
		setInput(event);
	};

	const updateLinks = () => {
		if(input === ""){
			return;
		}
		setLinks([...Links, input]);
		console.log(Links);
		setInput("");
	};

	/* 	TODO: add progress bars */
	return (
		<>
			<div className="input">
				<input
					type="text"
					placeholder="PASTE URL SONG OR PLAYLIST HERE"
					value={input}
					onChange={(e) => updateInput(e.target.value)}
				></input>
				<h1 id="submit" onClick={() => updateLinks()}>
					Submit
				</h1>
			</div>
		</>
	);
};

export default Form;
