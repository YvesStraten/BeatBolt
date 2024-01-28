import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { downloadDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api";
import {
	isPermissionGranted,
	requestPermission,
	sendNotification,
} from "@tauri-apps/api/notification";
import { useState } from "react";
import ApplicationDefault from "../types/main";
import { appWindow } from "@tauri-apps/api/window";

interface ProgressPayload {
	id: string;
	index: number;
	progress: number;
}

const Queue = ({ Links, setLinks }: ApplicationDefault) => {
	const [downloadStatus, setStatus] = useState<number[]>(
		new Array(Links.length).fill(0),
	);

	const [listening, setListening] = useState<boolean>(false);

	/* 	TODO: PROGRESS BAR */
	const statusHandler = (index: number, progress: number) => {
		const newStatus = downloadStatus.map((status, i) => {
			console.log(status);
			console.log(i);
			console.log(progress);
			if (i === index - 1) {
				return progress;
			} else {
				return status;
			}
		});

		console.log(newStatus);

		setStatus(newStatus);
	};

	const deleteItem = (link: String) => {
		setLinks(Links.filter((item: String) => item !== link));
	};

	const listenToEventIfNeeded = async (event: string) => {
		if (listening) {
			return await Promise.resolve();
		}

		return await appWindow
			.listen<ProgressPayload>(event, (e) => {
				console.log(e);
				const index: number | unknown = e.payload.index + 1;
				const status: number | unknown = e.payload.progress;
				sendNotif(index, Links.length);
				statusHandler(index as number, status as number);
			})
			.then(() => setListening(true));
	};

	const download = async () => {
		const dir = await downloadDir();
		await listenToEventIfNeeded("download://progress");

		invoke("processqueue", {
			links: Links,
			path: dir,
		});
	};
	const sendNotif = async (currentItem: number | unknown, allItems: number) => {
		let permissionGranted = await isPermissionGranted();
		if (!permissionGranted) {
			const permission = await requestPermission();
			permissionGranted = permission === "granted";
		}
		if (permissionGranted) {
			sendNotification({
				title: "Download progress",
				body: `Download ${currentItem}/${allItems}`,
				icon: "../../src-tauri/icons/32x32.png",
				sound: "default",
			});
		}
	};

	return (
		<div className="input">
			<ul className="queue">
				{Links.map((link: any, index: number) => {
					return (
						<div key={link}>
							<li>
								<a href={link}>{link}</a>
							</li>
							<button
								className="delete_button"
								onClick={() => deleteItem(link)}
							>
								<FontAwesomeIcon icon={faX} />
							</button>
							<h1 className="progress">{downloadStatus[index]}%</h1>
						</div>
					);
				})}
			</ul>
			<h1 onClick={() => download()}>Download!</h1>
			<h1
				onClick={() => {
					setLinks([]);
					setStatus([]);
				}}
			>
				Clear queue!
			</h1>
		</div>
	);
};

export default Queue;
