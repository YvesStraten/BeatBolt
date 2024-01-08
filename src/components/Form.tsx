import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { invoke } from "@tauri-apps/api";
import { isPermissionGranted, requestPermission, sendNotification } from "@tauri-apps/api/notification";
import { downloadDir } from "@tauri-apps/api/path";
import { useState } from "react";
import Progress from "./Progress";

type formType = {
	Links: String[],
	setLinks: (args: any) => void,
	mode: String
}
const Form = ({ Links, setLinks, mode }: formType) => {
	const [input, setInput] = useState<String>("")

	const updateInput = (event: String) => {
		console.log(event);
		setInput(event);
	}

	const updateLinks = () => {
		setLinks([...Links, input])
		console.log(Links);
		setInput("")
	}

	const deleteItem = (link: String) => {
		setLinks(Links.filter((item: String) => item !== link))
	}

	const sendNotif = async (currentItem: number, allItems: number) => {
		let permissionGranted = await isPermissionGranted();
		if (!permissionGranted) {
			const permission = await requestPermission();
			permissionGranted = permission === 'granted';
		}
		if (permissionGranted) {
			sendNotification({ title: 'Download progress', body: `Download ${currentItem}/${allItems}`, icon: "../../src-tauri/icons/32x32.png" });
		}
	}

	const download = async () => {
		console.log(mode);
		const dir = await downloadDir();
		console.log(dir);
		for (let i = 0; i <= Links.length - 1; i++) {
			if (mode === "spot") {
				invoke('download', { link: `${Links[i]}`, case: 0, path: `${dir}` })
					.then((response) => {
						console.log(response)
						sendNotif(i + 1, Links.length)
					})
			} else {

				invoke('download', { link: `${Links[i]}`, case: 1, path: `${dir}` })
					// `invoke` returns a Promise
					.then((response) => {
						console.log(response)
						sendNotif(i + 1, Links.length)
					})
			}
		}

	}

	/* 						TODO: add a way to extract audio with yt-dlp */
/* 	TODO: add progress bars */
	return (
		<>
			<input type="text" placeholder="Link to playlist or song" value={input} onChange={(e) => updateInput(e.target.value)}></input>
			<button onClick={() => updateLinks()}>Submit</button>

			<h1>Queue</h1>
			<ul>
				{Links.map((link: any) => (
					<>
						<li key={link}><a href={link}>{link}</a></li>
						<button key={link} onClick={() => deleteItem(link)}><FontAwesomeIcon icon={faX}/></button>
						<Progress />
						{mode === "yt" ? 
						<>
						<input type="checkbox" id="audiox"></input>
						<label htmlFor="audiox">Extract audio</label>
						</>
						: <></>
						}
					</>)
				)}

			</ul>
			<button onClick={() => download()}>Download!</button>
			<button onClick={() => setLinks([])}>Clear queue!</button>

		</>
	)
}

export default Form;
