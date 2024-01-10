import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { downloadDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api";
import { isPermissionGranted, requestPermission, sendNotification } from "@tauri-apps/api/notification";
import { useState } from "react";
import ApplicationDefault from "../types/main";
import ProgressBar from "@ramonak/react-progress-bar";

const Queue = ({ Links, setLinks, mode }: ApplicationDefault) => {

	const [downloadStatus, setStatus] = useState<boolean[]>(
		new Array(Links.length).fill(false)
	)

	const statusHandler = (index: number) => {
		const updatedCheckedState = downloadStatus.map((item: boolean, position: number) =>
			position === index ? !item : item
		);
		setStatus(updatedCheckedState);
		console.log(downloadStatus);
	}


	const deleteItem = (link: String) => {
		setLinks(Links.filter((item: String) => item !== link))
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
						statusHandler(i)
					})
			} else {

				invoke('download', { link: `${Links[i]}`, case: 1, path: `${dir}` })
					// `invoke` returns a Promise
					.then((response) => {
						console.log(response)
						sendNotif(i + 1, Links.length)
						statusHandler(i)
					})
			}
		}

		const sendNotif = async (currentItem: number, allItems: number) => {
			let permissionGranted = await isPermissionGranted();
			if (!permissionGranted) {
				const permission = await requestPermission();
				permissionGranted = permission === 'granted';
			}
			if (permissionGranted) {
				sendNotification({ title: 'Download progress', body: `Download ${currentItem}/${allItems}`, icon: "../../src-tauri/icons/32x32.png", sound: "default" });
			}
		}

	}

	return (
		<div className="input">
			<ul>

				{Links.map((link: any, index: number) => {
					if (downloadStatus[index] === true) {
						console.log(`Progress 100% with index ${downloadStatus[index]}`)
						return (
							<>
								<li key={link}><a href={link}>{link}</a></li>
								<button key={link} onClick={() => deleteItem(link)}><FontAwesomeIcon icon={faX} /></button>
								<ProgressBar className="wrapper"
									barContainerClassName="container"
									completedClassName="barCompleted"
									labelClassName="label"
									completed={100} />
							</>)
					} else {
						return (
							<>
								<li key={link}><a href={link}>{link}</a></li>
								<button key={link} onClick={() => deleteItem(link)}><FontAwesomeIcon icon={faX} /></button>
								<ProgressBar className="wrapper"
									barContainerClassName="container"
									labelClassName="label"
									completed={0} />
							</>)
					}
				})}
			</ul>
			<button onClick={() => download()}>Download!</button>
			<button onClick={() => setLinks([])}>Clear queue!</button>
		</div>)
}

export default Queue;
