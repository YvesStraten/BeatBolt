import { useState } from "react";
import ApplicationDefault from "../types/main";

const Form = ({ Links, setLinks }: ApplicationDefault) => {
	const [input, setInput] = useState<string>("")

	const updateInput = (event: string) => {
		console.log(event);
		setInput(event);
	}

	const updateLinks = () => {
		setLinks([...Links, input])
		console.log(Links);
		setInput("")
	}

	/* 	TODO: add progress bars */
	return (
		<>
			<div className="input">
				<input type="text" placeholder="Link to playlist or song" value={input} onChange={(e) => updateInput(e.target.value)}></input>
				<button onClick={() => updateLinks()}>Submit</button>

			</div>

		</>
	)
}

export default Form;
