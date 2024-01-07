import { invoke } from "@tauri-apps/api";
import { useState } from "react";

const Form = ({ Links, setLinks, mode}) => {
const [input, setInput ] = useState("")

const updateInput = (event) => {
console.log(event);
setInput(event);
}

const updateLinks = () => {
setLinks([...Links, input])
console.log(Links);
}

const deleteItem = (link) => {
setLinks(Links.filter(item => item !== link))

}

const download = () => {
console.log(mode);
for (let i = 0; i <= Links.length -1; i++) {
if(mode === "spot" ){
invoke('download', { link: `${Links[i]}`, case: 0})
  // `invoke` returns a Promise
  .then((response) => console.log(response))
} else {

invoke('download', { link: `${Links[i]}`, case: 1})
  // `invoke` returns a Promise
  .then((response) => console.log(response))
}
}

}

						/* TODO: add a way to delete links
						 */
/* 						TODO: add a way to extract audio with yt-dlp */
return ( 
<>
						<input type="text" placeholder="Link to playlist or song" onChange={(e) => updateInput(e.target.value)}></input>
						<button onClick={() => updateLinks()}>Submit</button>


						<h1>Queue</h1>
						<ol>
						{Links.map(link => (
						<>
						<li key={link}>{link}</li>
						<button key={link} onClick={() => deleteItem(link)}>X</button>
						</>)
						)}

						</ol>
					<button onClick={() => download()}>Download!</button>
					<button onClick={() => setLinks([])}>Clear queue!</button>

					</>
)
}

export default Form;
